import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log(`Function "submit-feedback" up and running!`)

serve(async (req) => {
  // Trata a requisição OPTIONS (necessária para CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Cria um cliente Supabase com o contexto de autenticação do usuário que fez a chamada.
    // Isso garante que apenas usuários logados possam usar esta função.
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Pega os dados do usuário a partir do token de autenticação.
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('Usuário não autenticado.')
    }

    // Extrai os dados enviados pelo formulário.
    const { rating, comment } = await req.json()

    // Validação dos dados no servidor.
    if (!rating || rating < 1 || rating > 5) {
      throw new Error('A nota deve ser entre 1 e 5.');
    }
    if (!comment || comment.trim().length < 10) {
      throw new Error('O comentário precisa ter no mínimo 10 caracteres.');
    }

    // Cria um cliente Supabase com poder de "admin" para inserir os dados no banco.
    // Isso é seguro pois já validamos que o usuário está autenticado.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Monta o objeto de feedback com os dados seguros do usuário (vindos do token).
    const feedbackData = {
        user_id: user.id,
        user_display_name: user.user_metadata?.user_name || user.user_metadata?.full_name || 'Usuário Anônimo',
        user_avatar_url: user.user_metadata?.avatar_url,
        rating,
        comment,
    };

    // Insere o feedback na tabela.
    const { error: insertError } = await supabaseAdmin
      .from('feedbacks')
      .insert(feedbackData)

    if (insertError) {
      throw insertError
    }

    // --- Envia a notificação para o Discord ---
    const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL')
    if (discordWebhookUrl) {
      const stars = '⭐'.repeat(rating) + '✩'.repeat(5 - rating);
      
      const embed = {
        title: `Novo Feedback Recebido! (${rating}/5)`,
        description: `**Usuário:** ${feedbackData.user_display_name}\n**Nota:** ${stars}\n\n**Comentário:**\n>>> ${comment}`,
        color: 0xf39c12, // Cor Laranja
        timestamp: new Date().toISOString(),
        footer: { text: `ID do Usuário: ${user.id}` },
        author: { name: feedbackData.user_display_name, icon_url: feedbackData.user_avatar_url }
      };

      // Envia a notificação
      await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] }),
      });
    }

    // Retorna uma resposta de sucesso para o site.
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    // Retorna uma resposta de erro.
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, // Usamos 400 para erros esperados, 500 para inesperados.
    })
  }
})