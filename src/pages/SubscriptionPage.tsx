// src/pages/SubscriptionPage.tsx
import { Title, Text, Card, Group, Badge, Button, Center, Loader, Paper } from '@mantine/core';
import { useUserData } from '../hooks/useUserData';
import { Link } from 'react-router-dom';

export function SubscriptionPage() {
  const { userData, loading } = useUserData();

  if (loading) {
    return <Center><Loader /></Center>;
  }

  // Se, por algum motivo, não houver dados, mostramos uma mensagem simples.
  if (!userData) {
    return (
      <div>
        <Title order={2}>Assinatura</Title>
        <Text c="dimmed" mt="md">Não foi possível carregar as informações da sua assinatura.</Text>
      </div>
    );
  }

  return (
    <div>
      <Title order={2}>Gerenciar Assinatura</Title>
      <Text c="dimmed">Veja os detalhes do seu plano atual e outras opções disponíveis.</Text>

      <Paper withBorder radius="md" p="xl" mt="xl">
        <Group justify="space-between">
          <div>
            <Text fz="lg" fw={500}>Seu Plano Atual</Text>
            <Text c="dimmed" fz="sm">Obrigado por fazer parte da JV Store!</Text>
          </div>
          <Badge size="xl" variant="light">
            {userData.plan}
          </Badge>
        </Group>

        <Text mt="lg" fz="sm">
          Com o plano <b>{userData.plan}</b>, você tem acesso aos bots listados na sua seção "Meus Bots" e suporte prioritário em nossa comunidade.
        </Text>

        <Group justify="flex-end" mt="xl">
          <Button
            component={Link}
            to="/pricing"
            variant="gradient"
            gradient={{ from: 'cyan', to: 'blue' }}
          >
            Ver Outros Planos
          </Button>
        </Group>
      </Paper>
    </div>
  );
}