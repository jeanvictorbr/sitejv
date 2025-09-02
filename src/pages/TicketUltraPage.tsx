import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

// Lista detalhada de funcionalidades para o TicketUltra, com descrições mais ricas
const ticketUltraFeatures = [
  {
    title: '🎫 Painéis de Suporte Dinâmicos',
    description: 'Crie painéis de tickets profissionais e personalizáveis. Com botões e menus interativos, seus membros podem abrir tickets por departamento (Suporte, Denúncia, etc.) com apenas um clique. Otimize a experiência e direcione cada pedido para a equipe certa.',
  },
  {
    title: '🤖 Atribuição e Rastreamento de Atendimento',
    description: 'O sistema permite que membros da sua equipe assumam um ticket para iniciar o atendimento. Com um painel claro e intuitivo, todos sabem quem está responsável por cada conversa, evitando duplicidade e garantindo agilidade no suporte.',
  },
  {
    title: '📜 Transcrição Automática e Segura',
    description: 'Ao fechar um ticket, o bot gera automaticamente uma transcrição completa de toda a conversa em formato de texto. Esta função de auditoria garante que cada atendimento seja registrado e acessível, proporcionando segurança e transparência para a equipe e para o usuário.',
  },
  {
    title: '💬 Canais Privados e Colaboração',
    description: 'Cada ticket é criado em um canal privado, visível apenas para o usuário e a equipe de suporte. Membros da equipe podem convidar outros administradores para a conversa, facilitando a colaboração em casos complexos.',
  },
  {
    title: '➕ Múltiplos Departamentos Personalizáveis',
    description: 'Configure diferentes categorias de suporte para o seu servidor. Seja para denúncias, dúvidas ou parcerias, o bot notifica apenas a equipe designada para cada tipo de ticket, garantindo que o tempo de resposta seja sempre o mais rápido possível.',
  },
  {
    title: '🔒 Controle de Permissões Robusto',
    description: 'Defina exatamente quais cargos podem interagir com o sistema de tickets, assumir atendimentos ou configurar o bot. Com um controle de permissões granular, você tem total controle sobre quem pode gerenciar o suporte da sua comunidade.',
  },
  {
    title: '⚡ Notificações e Agilidade no Suporte',
    description: 'Mantenha sua equipe de suporte sempre a par das novidades. O sistema notifica instantaneamente quando um novo ticket é aberto ou quando um membro envia uma nova mensagem, garantindo um atendimento ágil e profissional.',
  },
  {
    title: '🔗 Geração de Link para Compartilhamento',
    description: 'Compartilhe facilmente o link do painel de tickets em qualquer canal, post de anúncio ou DM. Promova seu sistema de suporte em toda a sua comunidade para que seus membros saibam exatamente onde procurar ajuda.',
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
