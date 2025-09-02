// src/pages/AdminOverview.tsx
import { Grid, Paper, Text, Title } from '@mantine/core';

// Componente para os cards de estatísticas
function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Paper withBorder p="md" radius="md">
      <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
        {title}
      </Text>
      <Text fw={700} fz={32} my={6}>
        {value}
      </Text>
      <Text c="dimmed" fz="sm">
        {description}
      </Text>
    </Paper>
  );
}

export function AdminOverview() {
  // No futuro, buscaremos esses dados do Supabase
  const stats = [
    { title: 'Usuários Registrados', value: '78', description: 'Total de usuários com conta.' },
    { title: 'Bots Ativos', value: '12', description: 'Assinaturas de bots ativas.' },
    { title: 'Receita Mensal', value: 'R$ 250', description: 'Estimativa para este mês.' },
    { title: 'Tickets Abertos', value: '3', description: 'Tickets de suporte pendentes.' },
  ];

  return (
    <div>
      <Title order={2}>Visão Geral</Title>
      <Text c="dimmed">Estatísticas e informações rápidas sobre a JV Store.</Text>

      <Grid mt="xl">
        {stats.map((stat) => (
          <Grid.Col key={stat.title} span={{ base: 12, md: 6, lg: 3 }}>
            <StatCard {...stat} />
          </Grid.Col>
        ))}
      </Grid>

      {/* Aqui poderemos adicionar mais componentes no futuro, como gráficos ou tabelas */}
    </div>
  );
}