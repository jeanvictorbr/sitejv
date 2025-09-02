import { Card, Text, Title, Button, List, Center, SimpleGrid, Badge, Container, Group, Divider } from '@mantine/core';
import { motion } from 'framer-motion';

// Lista de todos os módulos do FactionFlow para referenciar no Plano Completo
const factionFlowModules = [
  'Sistema de Registro e Recrutamento',
  'Ranking de Recrutadores',
  'Gestão Financeira Completa',
  'Gráficos e Relatórios de Performance',
  'Sincronização de Hierarquia Automática',
  'Sistema de Tags Dinâmicas',
  'Módulo de Conduta e Segurança',
  'Blacklist Automática',
  'Gerenciamento de Alianças Estratégicas',
  'Organização de Operações Táticas',
  'Depuração Inteligente de Inativos',
  'Módulo de Sorteios Profissionais',
  'Criador de Embeds Customizadas',
  'Comunicação em Massa'
];

// Lista de funcionalidades do TicketUltra, baseadas na página de venda
const ticketUltraModules = [
  'Painéis de Suporte Dinâmicos e Intuitivos',
  'Atribuição e Rastreamento de Atendimento',
  'Ranking de Eficiência da Equipe',
  'Sistema de Avaliação de Atendimento',
  'Transcrição Automática e Segura',
  'Canais Privados e Colaboração',
  'Múltiplos Departamentos Personalizáveis',
  'Controle de Permissões Robusto',
  'Notificações e Agilidade no Suporte',
  'Geração de Link para Compartilhamento',
];

const plans = [
  {
    title: 'Teste Gratuito',
    price: 'R$0',
    period: '/ 7 dias',
    description: 'Experimente a potência dos nossos bots premium com um período de teste de 7 dias, sem compromisso.',
    features: ['Acesso a 1 módulo à sua escolha', 'Suporte Limitado', 'Funcionalidades completas para teste'],
    buttonText: 'Iniciar Teste Gratuito',
    link: '#',
    variant: 'default',
  },
  {
    title: 'Plano FactionFlow Básico',
    price: 'R$29,99',
    period: '/ mês',
    description: 'Um pacote essencial para profissionalizar a gestão da sua comunidade. Escolha 4 módulos à sua vontade!',
    features: [
      '✅ Acesso a 4 módulos FactionFlow à sua escolha',
      '✅ Suporte prioritário',
      '❌ Acesso a todos os módulos',
      '❌ Módulos adicionais podem ser comprados separadamente',
    ],
    buttonText: 'Assinar FactionFlow Básico',
    link: '#',
    variant: 'gradient',
    gradient: { from: 'blue', to: 'cyan' },
    highlight: true,
  },
  {
    title: 'Plano FactionFlow Completo',
    price: 'R$44,99',
    period: '/ mês',
    description: 'A solução definitiva para servidores de facções. Tenha acesso irrestrito a todos os módulos.',
    features: factionFlowModules.map(module => `✅ ${module}`),
    buttonText: 'Assinar FactionFlow Completo',
    link: '#',
    variant: 'gradient',
    gradient: { from: 'lime', to: 'green' },
  },
  {
    title: 'Plano TicketUltra Completo',
    price: 'R$34,99', // Valor de exemplo, ajuste se necessário
    period: '/ mês',
    description: 'Profissionalize o suporte do seu servidor com um sistema de tickets completo e intuitivo.',
    features: ticketUltraModules.map(module => `✅ ${module}`),
    buttonText: 'Assinar TicketUltra Completo',
    link: '#',
    variant: 'gradient',
    gradient: { from: 'indigo', to: 'violet' },
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

export function PricingPage() {
  const planItems = plans.map((plan, index) => (
    <motion.div key={index} variants={itemVariants}>
      <Card withBorder radius="md" shadow="md" p="xl" h="100%"
            style={plan.highlight ? { border: '2px solid #228be6' } : {}}>
        <Group justify="center" mb="md">
          <Badge variant={plan.variant as any} gradient={plan.gradient} size="xl"
                 style={{ whiteSpace: 'normal', height: 'auto', textAlign: 'center' }}>
            {plan.title}
          </Badge>
        </Group>
        <Center mt="md">
          <Text fz={42} fw={700}>{plan.price}</Text>
          <Text c="dimmed" fz="md" mt="sm" ml={4}>{plan.period}</Text>
        </Center>
        <Text c="dimmed" ta="center" fz="sm" mt="md">{plan.description}</Text>

        <Button
          component="a"
          href={plan.link}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
          mt="xl"
          fullWidth
          variant={plan.variant as any}
          gradient={plan.gradient}
        >
          {plan.buttonText}
        </Button>

        <List spacing="sm" size="sm" mt="xl">
            {plan.features.map((feature, idx) => (
                <List.Item
                    key={idx}
                >
                    {feature}
                </List.Item>
            ))}
        </List>
      </Card>
    </motion.div>
  ));
  
  const allModulesList = [...factionFlowModules, ...ticketUltraModules];

  return (
    <Container py="xl">
      <Badge variant="light" size="lg">Planos e Preços</Badge>
      <Title order={1} ta="center" mt="md">Encontre o plano perfeito para sua comunidade</Title>
      <Text c="dimmed" ta="center" mt="md" maw={580} mx="auto">
        Comece com um teste gratuito ou escolha uma de nossas soluções premium para levar seu servidor a um novo patamar.
      </Text>
      
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl">
          {planItems[0]}
          {planItems[2]}
        </SimpleGrid>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl">
          {planItems[1]}
          {planItems[3]}
        </SimpleGrid>
      </motion.div>

      <Divider my="xl" />

      <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Card withBorder radius="md" shadow="md" p="xl">
          <Title order={2} ta="center" mb="md">
            Todos os Módulos Disponíveis
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {allModulesList.map((module, index) => (
              <Text key={index} fz="sm" fw={500}>
                ✅ {module}
              </Text>
            ))}
          </SimpleGrid>
        </Card>
      </motion.div>
    </Container>
  );
}
