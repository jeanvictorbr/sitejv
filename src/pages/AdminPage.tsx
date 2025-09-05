// src/pages/AdminPage.tsx
import { Container, Title, Text, Paper, Grid, Group } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import classes from './AdminPage.module.css';

const adminLinks = [
  { to: '/admin', label: 'Visão Geral', end: true, icon: '📊' },
  { to: '/admin/marquee', label: 'Letreiro', end: false, icon: '📢' },
  { to: '/admin/status', label: 'Status do Site', end: false, icon: '📡' }, // <<< NOVA LINHA ADICIONADA
  { to: '/admin/feedbacks', label: 'Feedbacks', end: false, icon: '⭐' },
];

export function AdminPage() {
  const { user } = useAuth();
  const { userData } = useUserData();

  return (
    <Container py="xl" size="xl">
      <Title order={1}>Painel de Administrador</Title>
      <Text c="dimmed">Bem-vindo, {userData?.display_name || user?.email}!</Text>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <nav>
              {adminLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}
                >
                  <Group gap="sm">
                    <Text>{link.icon}</Text>
                    <Text>{link.label}</Text>
                  </Group>
                </NavLink>
              ))}
            </nav>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 9 }}>
          <Paper withBorder p="xl" radius="md" h="100%">
            <Outlet />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

