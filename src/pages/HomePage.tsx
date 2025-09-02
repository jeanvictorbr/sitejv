import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

const featureCards = [
  {
    title: '🤖 Bots Modulares e Profissionais',
    description: 'Oferecemos soluções de automação e gestão de ponta, como o FactionFlow para comunidades de facções e o TicketUltra para suporte eficiente.',
    link: '/my-bots'
  },
  {
    title: '👑 Gestão Completa para Servidores',
    description: 'Automatize tarefas complexas, organize a hierarquia, gerencie finanças e mantenha um sistema de punições transparente, tudo em um só lugar.',
    link: '/factionflow'
  },
  {
    title: '⚡ Suporte Ágil e Personalizado',
    description: 'Com o TicketUltra, transforme a forma como sua comunidade busca ajuda. Crie painéis de suporte por departamento, transcreva logs e ofereça um ranking de avaliação de atendimento.',
    link: '/ticket-ultra'
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

export function HomePage() {
  const renderedCards = featureCards.map((feature) => (
    <motion.div key={feature.title} variants={itemVariants}>
      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
        <Text fw={500} size="lg">{feature.title}</Text>
        <Text size="sm" c="dimmed" mt="xs">
          {feature.description}
        </Text>
        <Button 
          variant="light" 
          color="blue" 
          mt="md" 
          component="a" 
          href={feature.link}
        >
          Saiba Mais
        </Button>
      </Card>
    </motion.div>
  ));

  return (
    <Container size="lg" py="xl">
      {/* Hero Section */}
      <Group justify="center" ta="center">
        <Badge variant="gradient" gradient={{ from: 'indigo', to: 'violet' }} size="xl">
          JV Store
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg" maw={800} mx="auto">
        A Solução Definitiva para o Gerenciamento de Servidores Discord.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Da automação de tarefas à gestão completa de comunidades, criamos ferramentas inteligentes e personalizadas para elevar a experiência do seu servidor a um novo patamar.
      </Text>

      <Divider my="xl" />

      {/* Seção de Destaques */}
      <Title order={2} ta="center" mt="xl">
        Conheça Nossas Soluções
      </Title>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
          {renderedCards}
        </SimpleGrid>
      </motion.div>
      
      <Divider my="xl" />

      {/* Seção de Chamada para Ação */}
      <Container size="sm" ta="center">
        <Title order={3}>Pronto para começar?</Title>
        <Text c="dimmed" mt="sm">
          Fale conosco para descobrir como podemos transformar sua comunidade.
        </Text>
        <Button
          mt="xl"
          size="xl"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'blue' }}
          component="a" 
          href="https://discord.gg/VxmmFpp7vD"
        >
          Entrar em Contato
        </Button>
      </Container>
    </Container>
  );
}
