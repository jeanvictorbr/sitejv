import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

const factionFlowFeatures = [
  {
    title: '🛡️ Sistema de Registro e Recrutamento',
    description: 'Automatize a entrada de novos membros com um painel de registro customizável. Defina cargos e canais de interação, envie formulários para novos membros e gerencie aprovações de forma profissional, mantendo o processo de recrutamento ágil e organizado.',
  },
  {
    title: '📈 Ranking de Recrutadores',
    description: 'Fomente a competição saudável na sua facção. Este módulo rastreia e exibe um ranking com os membros que mais recrutaram, premiando a dedicação e o esforço. Os dados são baseados em aprovações reais e podem ser ajustados ou resetados a qualquer momento.',
  },
  {
    title: '💰 Gestão Financeira Completa',
    description: 'O coração da sua economia. Adicione e edite itens no seu arsenal, registre vendas e investimentos, gere relatórios por data e visualize um dashboard completo com receita, lucros e as últimas transações. Tudo para uma gestão fiscal impecável.',
  },
  {
    title: '📊 Gráficos e Relatórios de Performance',
    description: 'Tome decisões estratégicas com base em dados concretos. O bot gera gráficos dos top vendedores e relatórios semanais que resumem o desempenho da facção, incluindo lucros e perdas.',
  },
  {
    title: '👑 Sincronização de Hierarquia Automática',
    description: 'Exiba a estrutura de poder da sua facção em um painel público e interativo. O bot atualiza automaticamente os cargos e a lista de membros a cada 3 minutos, garantindo que a hierarquia do Discord reflita o poder do seu clã em tempo real.',
  },
  {
    title: '🏷️ Sistema de Tags Dinâmicas',
    description: 'Mantenha a padronização e organização visual do seu servidor. Este sistema aplica tags automaticamente aos apelidos dos membros com base no seu cargo mais alto, garantindo uniformidade e identificação clara.',
  },
  {
    title: '⚖️ Módulo de Conduta e Segurança',
    description: 'Um sistema completo para registrar punições com base em um Código Penal customizável. Aplique advertências com cargos temporários, timeout, kick ou ban. O sistema mantém um dossiê detalhado por membro e permite revogar punições.',
  },
  {
    title: '🚫 Blacklist Automática',
    description: 'Proteja sua comunidade contra membros indesejados. Adicione IDs à blacklist, e o bot irá expulsá-los automaticamente caso tentem entrar no servidor. O sistema registra o motivo e o autor da blacklist para total transparência.',
  },
  {
    title: '🤝 Gerenciamento de Alianças Estratégicas',
    description: 'Organize e exiba suas parcerias em um painel interativo. Adicione, edite e remova aliados, incluindo informações como categorias, descrições, links de convite e até imagens de uniformes exclusivos.',
  },
  {
    title: '🎯 Organização de Operações Táticas',
    description: 'Agende missões e eventos de facção com um sistema de painel de status e lista de participantes. Os membros podem se inscrever com um clique, e você pode gerenciar tudo de forma centralizada.',
  },
  {
    title: '🧹 Depuração Inteligente de Inativos',
    description: 'Identifique e remova membros que não interagem há um período, mantendo seu servidor ativo e saudável. O bot envia DMs de aviso personalizadas antes da remoção, com um link para retorno.',
  },
  {
    title: '🎁 Módulo de Sorteios Profissionais',
    description: 'Crie e gerencie sorteios de forma profissional e automatizada. Defina a duração, número de vencedores e requisitos de cargo. Acompanhe os participantes em tempo real e sortei os vencedores de forma justa.',
  },
  {
    title: '🎨 Criador de Embeds Customizadas',
    description: 'Um estúdio completo dentro do Discord para criar, editar e publicar embeds personalizadas. Adicione títulos, descrições, imagens, cores e mais. Perfeito para anúncios, regras ou comunicados.',
  },
  {
    title: '📣 Módulo de Comunicação em Massa',
    description: 'Envie comunicados em massa para todos os membros via DM de forma controlada, pausando ou cancelando a operação a qualquer momento. Publique changelogs detalhados e defina relatórios automáticos de performance da facção.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export function FactionFlowPage() {
  const featureCards = factionFlowFeatures.map((feature) => (
    <motion.div key={feature.title} variants={itemVariants}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Text fw={500} size="lg">{feature.title}</Text>
        <Text size="sm" c="dimmed" mt="xs">
          {feature.description}
        </Text>
      </Card>
    </motion.div>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center" ta="center">
        <Badge variant="gradient" gradient={{ from: 'cyan', to: 'blue' }} size="xl">
          FactionFlow
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg">
        Gerencie a sua facção com a inteligência e eficiência de um sistema profissional.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Cansado de gerenciar tudo em planilhas? De resolver disputas manualmente? O FactionFlow é a solução completa que automatiza tarefas complexas para que você possa focar em criar a melhor experiência para seus membros.
      </Text>

      <Divider my="xl" />

      <Title order={2} ta="center" mt="xl">
        Funcionalidades que Elevam o Nível da sua Comunidade
      </Title>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
          {featureCards}
        </SimpleGrid>
      </motion.div>
      
      <Divider my="xl" />

      <Container size="sm" ta="center">
        <Title order={3}>Pronto para profissionalizar seu servidor?</Title>
        <Text c="dimmed" mt="sm">
          Instale o FactionFlow hoje mesmo e sinta a diferença de uma gestão automatizada e eficiente.
        </Text>
        <Button
          mt="xl"
          size="xl"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'blue' }}
          component="a" 
          href="https://discord.gg/VxmmFpp7vD"
        >
          Adicionar ao meu Servidor
        </Button>
      </Container>
    </Container>
  );
}
