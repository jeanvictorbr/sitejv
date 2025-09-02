// src/pages/TicketUltraPage.tsx
import { Container, Title, Text, SimpleGrid, Card, Badge, Group, Button, Divider } from "@mantine/core";

// Lista detalhada de funcionalidades para o TicketUltra
const ticketUltraFeatures = [
  {
    title: 'Painéis de Ticket Modernos',
    description: 'Crie painéis com botões e menus interativos. Seus membros podem abrir tickets por departamento (Suporte, Denúncia, etc.) com um único clique.',
  },
  {
    title: 'Gestão de Atendimento Completa',
    description: 'Sua equipe pode assumir tickets, adicionar outros membros à conversa, fechar e transcrever atendimentos. Tudo de forma organizada.',
  },
  {
    title: 'Transcrição Automática (Logs)',
    description: 'Ao fechar um ticket, o bot gera automaticamente um arquivo de texto com todo o histórico da conversa, garantindo segurança e um registro completo.',
  },
  {
    title: 'Múltiplos Departamentos',
    description: 'Configure diferentes categorias de suporte. Notifique apenas a equipe certa para cada tipo de ticket, otimizando o tempo de resposta.',
  },
  {
    title: 'Permissões Customizáveis',
    description: 'Defina exatamente quais cargos podem ver os tickets, gerenciar atendimentos ou configurar o bot. Controle total para sua equipe.',
  },
  {
    title: 'Notificações Inteligentes',
    description: 'A equipe de suporte é notificada instantaneamente quando um novo ticket é aberto ou quando um membro responde, garantindo um atendimento ágil.',
  },
];

export function TicketUltraPage() {
  const featureCards = ticketUltraFeatures.map((feature) => (
    <Card key={feature.title} shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={500} size="lg">{feature.title}</Text>
      <Text size="sm" c="dimmed" mt="xs">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      {/* 1. Hero Section da Página */}
      <Group justify="center" ta="center">
        <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="xl">
          TicketUltra
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg">
        O Fim da Desorganização. O Início do Suporte Profissional.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Diga adeus às DMs perdidas e aos canais de chat bagunçados. O TicketUltra cria um sistema de suporte centralizado, intuitivo e eficiente, passando a confiança que sua comunidade merece.
      </Text>

      <Divider my="xl" />

      {/* 2. Seção de Funcionalidades Detalhadas */}
      <Title order={2} ta="center" mt="xl">
        Recursos Criados para um Suporte de Excelência
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="lg">
        {featureCards}
      </SimpleGrid>

      {/* 3. Seção de Chamada para Ação (CTA) */}
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
          href="https://discord.gg/VxmmFpp7vD" // Futuro link de convite/compra
        >
          Adicionar ao meu Servidor
        </Button>
      </Container>
    </Container>
  );
}