import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider, Accordion } from "@mantine/core";
import { motion } from 'framer-motion';

const sectionAnimation: any = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
};

// Conteúdo populado para o componente Hero
const Hero = () => (
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

// Conteúdo populado para o componente Marquee
const Marquee = () => (
    // Este é um espaço reservado. Você pode adicionar seu HTML de letreiro aqui.
    <div style={{ padding: '1rem', backgroundColor: '#1e1e1e', color: 'white' }}>
      <Text ta="center" size="lg">🚀 FactionFlow: Gestão completa de facções | 🛡️ TicketUltra: Suporte profissional e eficiente | 📈 Melhore seu servidor hoje!</Text>
    </div>
);


// Conteúdo populado para o componente Features
const Features = () => {
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
        </Container>
    );
};

// Conteúdo populado para o componente ValueProposition
const ValueProposition = () => (
    <Container size="lg" py="xl">
        <Title order={2} ta="center" mt="xl">
            Por Que Escolher a JV Store?
        </Title>
        <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
            Nossas ferramentas são construídas com foco em desempenho, segurança e usabilidade. Entregamos soluções robustas que se adaptam perfeitamente à sua comunidade, garantindo uma gestão sem dores de cabeça.
        </Text>
        <Center mt="xl">
            <Text fw={700} c="blue" fz="lg">Confiabilidade • Inovação • Suporte Dedicado</Text>
        </Center>
    </Container>
);

// Conteúdo populado para o componente Faq
const Faq = () => {
    const faqData = [
        {
            question: 'O que é o FactionFlow?',
            answer: 'O FactionFlow é um bot modular para Discord, focado em gerenciar comunidades de facções. Ele oferece módulos de registro, finanças, hierarquia, punições e muito mais para automatizar e profissionalizar a gestão do seu servidor.'
        },
        {
            question: 'O que é o TicketUltra?',
            answer: 'O TicketUltra é um sistema de tickets avançado que profissionaliza o suporte do seu servidor. Ele cria painéis por departamento, transcreve logs de atendimento, e oferece um ranking de eficiência para a sua equipe, acabando com a desorganização nas DMs.'
        },
        {
            question: 'Como posso adquirir os bots?',
            answer: 'Você pode começar com nosso teste gratuito para qualquer bot e depois escolher um plano que se adapte às suas necessidades. Entre em contato conosco através do botão "Fale Conosco" para mais detalhes!'
        }
    ];

    const items = faqData.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Container size="lg" py="xl">
            <Title order={2} ta="center" mt="xl">
                Perguntas Frequentes
            </Title>
            <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
                Aqui você encontra respostas para as dúvidas mais comuns sobre nossos bots e serviços.
            </Text>
            <Accordion variant="separated" radius="md" defaultValue="O que é o FactionFlow?" mt="xl">
                {items}
            </Accordion>
        </Container>
    );
};


export function HomePage() {
  return (
    <>
      <Hero />
      <div style={{ marginTop: '2rem' }}>
        <Marquee />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <Features />
        </motion.div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <ValueProposition />
        </motion.div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <Faq />
        </motion.div>
      </div>
    </>
  );
}
