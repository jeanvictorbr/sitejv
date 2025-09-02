// src/pages/DashboardOverview.tsx
import { Text, Grid, Card, Group, Title, Loader, Center } from '@mantine/core';
import { useUserData } from '../hooks/useUserData';

export function DashboardOverview() {
  const { userData, loading } = useUserData(); // Pega os dados detalhados do usuário (Firestore)

  // Enquanto os dados estão sendo carregados, mostre um loader
  if (loading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  // Se o loading terminou mas não encontrou dados, mostra uma mensagem
  if (!userData) {
    return (
      <Text>
        Parece que esta é sua primeira vez aqui! Em breve, suas informações aparecerão no painel.
      </Text>
    );
  }

  // Se os dados foram carregados com sucesso, mostra os cards
  return (
    <Grid>
      {/* Card Meus Bots */}
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Card withBorder radius="md" p="md" h="100%">
          <Group>
            <Text fz={24}>🤖</Text>
            <Title order={3}>Meus Bots</Title>
          </Group>
          <Text mt="md" c="dimmed">
            Você possui atualmente <b>{userData.bots.length} bots</b> ativos.
          </Text>
        </Card>
      </Grid.Col>

      {/* Card Minha Assinatura */}
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <Card withBorder radius="md" p="md" h="100%">
          <Group>
            <Text fz={24}>💳</Text>
            <Title order={3}>Minha Assinatura</Title>
          </Group>
          <Text mt="md" c="dimmed">
            Seu plano: <b>{userData.plan}</b>.
          </Text>
        </Card>
      </Grid.Col>

      {/* Card de Configurações da Conta */}
      <Grid.Col span={12}>
          <Card withBorder radius="md" p="xl" mt="md">
              <Title order={3}>Configurações da Conta</Title>
              <Text mt="sm" c="dimmed">Aqui você poderá gerenciar suas informações de perfil, alterar seu e-mail e outras configurações de segurança.</Text>
          </Card>
      </Grid.Col>
    </Grid>
  );
}