// supabase/functions/update-status/index.ts
// DEPOIS (Correto)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Lida com a requisição pre-flight do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Pega os dados enviados pelo formulário de admin
    const { message, status } = await req.json()

    // Cria um cliente Supabase com privilégios de administrador para poder escrever no DB
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Atualiza o documento 'current' na tabela 'site_status'
    const { error } = await supabaseAdmin
      .from('site_status')
      .update({ message, status })
      .eq('id', 'current') // Assumindo que o ID do documento é 'current'

    if (error) throw error

    return new Response(JSON.stringify({ message: "Status atualizado com sucesso!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})