import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";
import { motion } from 'framer-motion';

const sectionAnimation: any = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
};

// Conteúdo populado para o componente Hero
const HeroSection = () => (
    <Container size="lg" py="xl" ta="center">
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
        <Button
            mt="xl"
            size="xl"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'blue' }}
            component="a"
            href="https://discord.gg/VxmmFpp7vD"
        >
            Fale Conosco
        </Button>
    </Container>
);

// Conteúdo populado para o componente Features
const FeaturesSection = () => {
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

    return (
        <Container size="lg" py="xl">
            <Title order={2} ta="center" mt="xl">
                Conheça Nossas Soluções
            </Title>
            <motion.div {...sectionAnimation}>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
                    {featureCards.map((feature, index) => (
                        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder h="100%">
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
                    ))}
                </SimpleGrid>
            </motion.div>
        </Container>
    );
};

// Conteúdo populado para o componente ValueProposition
const ValuePropositionSection = () => (
    <Container size="lg" py="xl">
        <Title order={2} ta="center" mt="xl">
            Por Que Escolher a JV Store?
        </Title>
        <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
            Nossas ferramentas são construídas com foco em desempenho, segurança e usabilidade. Entregamos soluções robustas que se adaptam perfeitamente à sua comunidade.
        </Text>
        {/* Você pode adicionar mais cards ou texto aqui */}
    </Container>
);

// Conteúdo populado para o componente Faq
const FaqSection = () => (
    <Container size="lg" py="xl">
        <Title order={2} ta="center" mt="xl">
            Perguntas Frequentes
        </Title>
        <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
            Aqui você encontra respostas para as dúvidas mais comuns sobre nossos bots e serviços.
        </Text>
        {/* Adicionar Accordion com perguntas e respostas aqui */}
    </Container>
);

// O componente Marquee já foi populado com a sua lógica
const MarqueeSection = () => (
    // Seu código original do Marquee.tsx seria inserido aqui
    <div style={{ marginTop: '2rem' }}>
        {/* Conteúdo do Marquee.tsx iria aqui */}
    </div>
);


export function HomePage() {
  return (
    <>
      <HeroSection />
      <div style={{ marginTop: '2rem' }}>
        <MarqueeSection />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <FeaturesSection />
        </motion.div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <ValuePropositionSection />
        </motion.div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <FaqSection />
        </motion.div>
      </div>
    </>
  );
}
