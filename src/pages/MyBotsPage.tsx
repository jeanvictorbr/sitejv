// src/pages/MyBotsPage.tsx
import { Title, Text, Grid, Card, Group, Badge, Button, Center, Loader } from '@mantine/core';
import { useUserData } from '../hooks/useUserData';
import { Link } from 'react-router-dom';

const botsInfo: Record<string, { emoji: string; description: string }> = {
  'FactionFlow': {
    emoji: '🛡️',
    description: 'Gestão completa de facções, economias e territórios.',
  },
  'TicketUltra': {
    emoji: '🎫',
    description: 'Sistema de suporte profissional com painéis interativos.',
  },
};

export function MyBotsPage() {
  const { userData, loading } = useUserData();

  if (loading) {
    return <Center><Loader /></Center>;
  }

  if (!userData || userData.bots.length === 0) {
    return (
      <div>
        <Title order={2}>Meus Bots</Title>
        <Text c="dimmed" mt="md">Você ainda não possui bots ativos.</Text>
        <Button component={Link} to="/pricing" variant="light" mt="md">
          Ver Planos
        </Button>
      </div>
    );
  }

  // ESTE É O ÚNICO 'RETURN' PRINCIPAL
  return (
    <div>
      <Title order={2}>Meus Bots</Title>
      <Text c="dimmed">Gerencie seus bots e configurações aqui.</Text>

      <Grid mt="xl">
        {userData.bots.map((botName) => {
          const info = botsInfo[botName] || {
            emoji: '🤖',
            description: 'Bot personalizado.'
          };

          // O .map retorna o JSX de cada card
          return (
            <Grid.Col span={{ base: 12, md: 6 }} key={botName}>
              <Card withBorder radius="md" p="md">
                <Group>
                  <Text fz={24}>{info.emoji}</Text>
                  <Title order={4}>{botName}</Title>
                  <Badge color="green">Ativo</Badge>
                </Group>
                <Text mt="sm" c="dimmed" fz="sm">
                  {info.description}
                </Text>
                <Button variant="light" mt="md" fullWidth>
                  Gerenciar
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
}