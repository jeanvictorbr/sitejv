import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

const factionFlowFeatures = [
  {
    title: 'Gestão de Facções Simplificada',
    description: 'Crie, edite, defina líderes e remova facções com comandos intuitivos. Toda a estrutura da sua comunidade na palma da sua mão.',
  },
  {
    title: 'Sistema de Banco Integrado',
    description: 'Cada facção tem seu próprio cofre virtual. Gerencie depósitos, saques e transferências com segurança e com logs completos para evitar fraudes.',
  },
  {
    title: 'Controle de Membros Automatizado',
    description: 'Convide, promova, rebaixe ou expulse membros. O bot atualiza cargos e permissões automaticamente, economizando seu tempo.',
  },
  {
    title: 'Domínio de Território (Dominions)',
    description: 'Sistema completo para que facções declarem guerra e conquistem territórios, com regras claras e um placar de líderes para incentivar a competição.',
  },
  {
    title: 'Logs Detalhados',
    description: 'Toda ação importante, desde uma transação no banco até a expulsão de um membro, é registrada. Tenha total controle e segurança sobre o que acontece.',
  },
  {
    title: 'Altamente Customizável',
    description: 'Configure o prefixo do bot, mensagens, cargos de liderança e muito mais para que o FactionFlow se adapte perfeitamente ao seu servidor.',
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
      {/* 1. Hero Section da Página */}
      <Group justify="center" ta="center">
        <Badge variant="gradient" gradient={{ from: 'cyan', to: 'blue' }} size="xl">
          FactionFlow
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg">
        A ferramenta definitiva para administrar servidores de facções.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Cansado de gerenciar tudo em planilhas? De resolver disputas manualmente? O FactionFlow automatiza as tarefas chatas para que você possa focar em criar a melhor experiência para seus jogadores.
      </Text>

      <Divider my="xl" />

      {/* 2. Seção de Funcionalidades Detalhadas */}
      <Title order={2} ta="center" mt="xl">
        Funcionalidades Pensadas para o Sucesso da sua Comunidade
      </Title>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Anima quando entra na tela
        viewport={{ once: true }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
          {featureCards}
        </SimpleGrid>
      </motion.div>
      
      {/* 3. Seção de Chamada para Ação (CTA) */}
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