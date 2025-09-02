import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

const factionFlowFeatures = [
  {
    title: '🛡️ Sistema de Registro e Recrutamento',
    description: 'Automatize a entrada de novos membros com um formulário de registro completo e um sistema de aprovação por tickets. Acompanhe a performance de seus recrutadores em um ranking detalhado e automatize a mudança de apelido do membro para um padrão profissional.',
  },
  {
    title: '💰 Módulo Financeiro & Arsenal',
    description: 'Gerencie o catálogo de itens, controle o fluxo de caixa, registre vendas e investimentos. Visualize o desempenho financeiro da facção e o ranking dos top vendedores com gráficos detalhados. Chega de planilhas!',
  },
  {
    title: '👑 Sincronização de Hierarquia Automática',
    description: 'Exiba a estrutura de poder da sua facção em um painel público e interativo. O bot atualiza automaticamente os cargos e a lista de membros a cada 3 minutos, garantindo que a hierarquia do Discord reflita o poder do seu clã em tempo real.',
  },
  {
    title: '⚖️ Código Penal e Punições (Conduta)',
    description: 'Crie um código penal customizado com regras e punições padrão. Registre infrações, aplique cargos temporários (ADV), timeout ou banimentos, e mantenha um histórico de conduta detalhado de cada membro. Inclui uma blacklist para expulsar automaticamente membros indesejados.',
  },
  {
    title: '🤝 Gerenciamento de Alianças Estratégicas',
    description: 'Organize e exiba suas parcerias em um painel interativo. Adicione, edite e remova aliados, incluindo informações como categorias, descrições e até imagens de uniformes exclusivos.',
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
    title: '📣 Comunicação em Massa e Relatórios',
    description: 'Envie comunicados em massa para todos os membros via DM, publique changelogs detalhados, use o criador de embeds para anúncios visualmente atraentes e defina relatórios automáticos de performance da facção.',
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
