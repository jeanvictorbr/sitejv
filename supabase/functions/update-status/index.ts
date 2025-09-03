// supabase/functions/update-status/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2'
// 1. IMPORTA OS CABEÇALHOS DE CORS DO ARQUIVO CORRETO
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // 2. Lida com a requisição pre-flight do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, status } = await req.json()

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error } = await supabaseAdmin
      .from('site_status')
      .update({ message, status })
      .eq('id', 'current') 

    if (error) throw error

    // 3. ADICIONA OS CABEÇALHOS DE CORS NA RESPOSTA DE SUCESSO
    return new Response(JSON.stringify({ message: "Status atualizado com sucesso!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    // 4. ADICIONA OS CABEÇALHOS DE CORS NA RESPOSTA DE ERRO
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
