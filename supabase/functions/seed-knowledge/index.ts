import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'npm:@google/generative-ai'
import { corsHeaders } from '../_shared/cors.ts'

// Conteúdo extraído das suas páginas. Adicione mais se precisar!
const knowledge = [
  { page: 'FactionFlow', content: 'O FactionFlow é a solução definitiva para servidores de facções. Gerencie membros, economia, hierarquia e organize operações táticas de forma totalmente automatizada e intuitiva.' },
  { page: 'FactionFlow', content: 'Sistema de Registro e Recrutamento: Automatize a entrada de novos membros com um painel de registro customizável, defina cargos, envie formulários e gerencie aprovações.' },
  { page: 'FactionFlow', content: 'Ranking de Recrutadores: Fomenta a competição saudável, rastreando e exibindo um ranking dos membros que mais recrutaram.' },
  { page: 'FactionFlow', content: 'Gestão Financeira Completa: Adicione e edite itens no arsenal, registre vendas e investimentos, gere relatórios e visualize um dashboard com receita e lucros.' },
  { page: 'TicketUltra', content: 'O TicketUltra oferece um suporte ágil e organizado para sua comunidade. Crie painéis de atendimento personalizados, gerencie tickets por departamento e garanta logs completos de todas as interações.' },
  { page: 'TicketUltra', content: 'Painéis de Suporte Dinâmicos e Intuitivos: Crie painéis profissionais e personalizáveis com botões e menus interativos para que membros abram tickets por departamento.' },
  { page: 'TicketUltra', content: 'Atribuição e Rastreamento de Atendimento: A equipe pode assumir um ticket, evitando duplicidade e garantindo agilidade no suporte.' },
  { page: 'TicketUltra', content: 'Transcrição Automática e Segura: Ao fechar um ticket, o bot gera automaticamente uma transcrição completa da conversa para auditoria e segurança.' },
  { page: 'Preços', content: 'Oferecemos um plano de Teste Gratuito por 7 dias com acesso a todo o sistema e suporte limitado.' },
  { page: 'Preços', content: 'O Plano FactionFlow Completo custa R$39,99 por mês e inclui todos os módulos.' },
  { page: 'Preços', content: 'O Plano TicketUltra Completo custa R$34,99 por mês e inclui todas as suas funcionalidades.' },
  { page: 'FAQ', content: 'Para usar os bots não é preciso saber programar. Eles são configurados por comandos simples e intuitivos no Discord.' },
  { page: 'FAQ', content: 'Os bots ficam online 24 horas por dia, 7 dias por semana, hospedados na Discloud.' },
  { page: 'FAQ', content: 'O suporte é oferecido em nossa comunidade do Discord. Clientes premium têm suporte prioritário.' },
];

const genAI = new GoogleGenerativeAI(Deno.env.get('GOOGLE_AI_API_KEY'))
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

Deno.serve(async (_req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Limpa a base de conhecimento antiga para evitar duplicatas
    await supabaseAdmin.from('documents').delete().neq('id', 0);

    // 2. Gera e insere os novos embeddings
    for (const doc of knowledge) {
      const embeddingResult = await embeddingModel.embedContent(doc.content);
      const embedding = embeddingResult.embedding.values;

      await supabaseAdmin.from('documents').insert({
        content: `Fonte: ${doc.page} - Conteúdo: ${doc.content}`,
        embedding,
      });
    }

    return new Response(JSON.stringify({ message: "Base de conhecimento alimentada com sucesso!" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});