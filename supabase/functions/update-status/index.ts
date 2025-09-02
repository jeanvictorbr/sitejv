// supabase/functions/update-status/index.ts
import { createClient } from 'npm:@supabase/supabase-js@2'
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
      Deno.env.get('https://btleajnwmukyjznwnifr.supabase.co') ?? '',
      Deno.env.get('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bGVham53bXVreWp6bnduaWZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njc1OTM0OCwiZXhwIjoyMDcyMzM1MzQ4fQ.B1NtI7-YL8lPV_jaUK_2yA1UHBKFVY144B3BmETw9mA') ?? ''
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