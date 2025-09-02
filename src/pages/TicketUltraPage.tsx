import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

// Lista detalhada de funcionalidades para o TicketUltra, com descrições mais ricas
const ticketUltraFeatures = [
  {
    title: '🎫 Painéis de Ticket Dinâmicos',
    description: 'Crie painéis de suporte profissionais com botões e menus interativos. Seus membros podem abrir tickets por departamento (Suporte, Denúncia, etc.) com apenas um clique, garantindo que a equipe correta seja notificada imediatamente.',
  },
  {
    title: '✅ Atendimento Eficiente e Organizado',
    description: 'Sua equipe pode assumir tickets, adicionar outros membros à conversa e fechar atendimentos de forma organizada, centralizando o fluxo de trabalho e evitando a desorganização de DMs ou canais de texto.',
  },
  {
    title: '📜 Transcrição Automática (Logs)',
    description: 'Ao fechar um ticket, o bot gera automaticamente uma transcrição completa da conversa em formato de texto. Isso garante um registro detalhado de todas as interações, essencial para segurança e auditoria.',
  },
  {
    title: '➕ Múltiplos Departamentos Customizáveis',
    description: 'Configure diferentes categorias de suporte para o seu servidor. Notifique apenas a equipe certa para cada tipo de ticket, otimizando o tempo de resposta e garantindo que cada caso seja tratado pela pessoa mais qualificada.',
  },
  {
    title: '🔒 Permissões e Acesso Totalmente Controlados',
    description: 'Defina exatamente quais cargos podem interagir com o sistema de tickets, gerenciar atendimentos ou configurar o bot. Garanta que apenas a sua equipe de confiança tenha acesso às ferramentas de suporte mais sensíveis.',
  },
  {
    title: '⚡ Notificações e Agilidade no Suporte',
    description: 'Mantenha sua equipe de suporte sempre a par das novidades. O sistema notifica instantaneamente quando um novo ticket é aberto ou quando um membro envia uma nova mensagem, garantindo um atendimento ágil e profissional.',
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

export function TicketUltraPage() {
  const featureCards = ticketUltraFeatures.map((feature) => (
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
        <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="xl">
          TicketUltra
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg">
        O Fim da Desorganização. O Início do Suporte Profissional.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Diga adeus às DMs perdidas e aos canais de chat bagunçados. O TicketUltra centraliza e profissionaliza o sistema de suporte, garantindo a confiança que sua comunidade merece.
      </Text>

      <Divider my="xl" />

      <Title order={2} ta="center" mt="xl">
        Recursos Criados para um Suporte de Excelência
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
        <Title order={3}>Pronto para oferecer o melhor suporte?</Title>
        <Text c="dimmed" mt="sm">
          Instale o TicketUltra e transforme a maneira como você interage com seus membros.
        </Text>
        <Button
          mt="xl"
          size="xl"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          component="a" 
          href="https://discord.gg/VxmmFpp7vD"
        >
          Adicionar ao meu Servidor
        </Button>
      </Container>
    </Container>
  );
}
