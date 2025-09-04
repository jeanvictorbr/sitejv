import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'npm:@google/generative-ai'
import { corsHeaders } from '../_shared/cors.ts'

const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_AI_API_KEY'))

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { query } = await req.json()

  // Cria um cliente com privilégios de administrador
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 1. Gera o embedding (vetor) para a pergunta do usuário
  const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const embeddingResult = await embeddingModel.embedContent(query);
  const queryEmbedding = embeddingResult.embedding.values;

  // 2. Busca na nossa base de conhecimento por informações relevantes
  const { data: documents, error: matchError } = await supabaseAdmin.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7, // Nível de confiança
    match_count: 5,
  })

  if (matchError) {
    console.error(matchError)
    return new Response(JSON.stringify({ error: 'Erro ao buscar contexto.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  const contextText = documents.map((doc: any) => doc.content).join('\n---\n')

  // 3. Usa o Gemini para gerar uma resposta com base no contexto
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    Você é o "Agente JV", um assistente virtual amigável e prestativo do site JV Store.
    Sua missão é responder às perguntas dos usuários sobre os produtos e serviços da JV Store.
    Use SOMENTE as informações do CONTEXTO abaixo para formular sua resposta.
    Se a resposta não estiver no contexto, diga "Hmm, não encontrei informações sobre isso. Você poderia perguntar de outra forma?".
    Seja direto e claro em suas respostas.

    CONTEXTO:
    ${contextText}

    PERGUNTA DO USUÁRIO:
    ${query}
  `
  const result = await model.generateContent(prompt)
  const response = await result.response

  return new Response(JSON.stringify({ response: response.text() }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
})