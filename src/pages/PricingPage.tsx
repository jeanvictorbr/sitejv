// src/pages/PricingPage.tsx
import { Card, Text, Title, Button, List, Center, SimpleGrid, Badge, Container } from '@mantine/core';

const plans = [
  {
    title: 'Teste Gratuito',
    price: 'R$0',
    period: '/ 7 dias',
    description: 'Experimente os recursos premium de qualquer um dos nossos bots e veja o poder da JV Store em ação.',
    features: ['Acesso ao nosso Bot Premium', 'Suporte Limitado', 'Funcionalidades Completas para teste'],
    buttonText: 'Iniciar Teste Gratuito',
    buttonVariant: 'default',
    // ▼▼▼ COLOQUE SEU LINK PARA INICIAR O TESTE AQUI ▼▼▼
    link: 'https://discord.gg/VxmmFpp7vD'
  },
  {
    title: 'FactionFlow',
    price: 'R$XX,XX',
    period: '/ mês',
    description: 'A solução definitiva para servidores de facções. Gestão completa para sua comunidade.',
    features: ['Todas as funcionalidades do FactionFlow', 'Suporte Prioritário', 'Atualizações Contínuas'],
    buttonText: 'Adquirir FactionFlow',
    buttonVariant: 'gradient',
    // ▼▼▼ COLOQUE SEU LINK DE COMPRA/CHECKOUT DO FACTIONFLOW AQUI ▼▼▼
    link: 'https://discord.gg/VxmmFpp7vD'
  },
  {
    title: 'TicketUltra',
    price: 'R$YY,YY',
    period: '/ mês',
    description: 'Profissionalize o suporte do seu servidor com um sistema de tickets completo e intuitivo.',
    features: ['Todas as funcionalidades do TicketUltra', 'Suporte Prioritário', 'Atualizações Contínuas', 'Transcrição de Logs'],
    buttonText: 'Adquirir TicketUltra',
    buttonVariant: 'gradient',
    // ▼▼▼ COLOQUE SEU LINK DE COMPRA/CHECKOUT DO TICKETULTRA AQUI ▼▼▼
    link: 'https://discord.gg/VxmmFpp7vD'
  },
];

export function PricingPage() {
  const items = plans.map((plan) => (
    <Card withBorder radius="md" shadow="md" p="xl" key={plan.title} h="100%">
      <Text fz="lg" fw={500}>{plan.title}</Text>
      <Text c="dimmed" fz="sm" mt="sm">{plan.description}</Text>
      <Center mt="md">
        <Text fz={42} fw={700}>{plan.price}</Text>
        <Text c="dimmed" fz="md" mt="sm" ml={4}>{plan.period}</Text>
      </Center>

      {/* A MUDANÇA ESTÁ AQUI: ADICIONAMOS component="a" e href={plan.link} */}
      <Button
        component="a"
        href={plan.link}
        target="_blank" // Abre o link em uma nova aba
        rel="noopener noreferrer" // Boas práticas de segurança para links em nova aba
        size="md"
        mt="xl"
        fullWidth
        variant={plan.buttonVariant as any}
        gradient={{ from: 'cyan', to: 'blue' }}
      >
        {plan.buttonText}
      </Button>

      <List spacing="sm" size="sm" mt="xl">
        {plan.features.map(feature => <List.Item key={feature}>✅ {feature}</List.Item>)}
      </List>
    </Card>
  ));

  return (
    <Container py="xl">
      <Badge variant="light" size="lg">Planos e Preços</Badge>
      <Title order={1} ta="center" mt="md">Encontre o plano perfeito para sua comunidade</Title>
      <Text c="dimmed" ta="center" mt="md" maw={580} mx="auto">
        Comece com um teste gratuito ou escolha uma de nossas soluções premium para levar seu servidor a um novo patamar.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
        {items}
      </SimpleGrid>
    </Container>
  );

}
