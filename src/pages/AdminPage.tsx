// src/pages/AdminPage.tsx
import { Container, Title, Text, Paper, Grid, NavLink as MantineNavLink, Group } from '@mantine/core';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import classes from './AdminPage.module.css';

const adminLinks = [
  { to: '/admin', label: 'Visão Geral', end: true, icon: '📊' }, // <<< Ícone substituído por emoji
  { to: '/admin/marquee', label: 'Letreiro', end: false, icon: '📢' }, // <<< Ícone substituído por emoji
];

export function AdminPage() {
  const { user } = useAuth();
  const { userData, loading: userDataLoading } = useUserData();

  return (
    <Container py="xl" size="xl">
      <Title order={1}>Painel de Administrador</Title>
      <Text c="dimmed">Bem-vindo, {userData?.display_name || user?.email}!</Text>

      <Grid mt="xl">
        {/* Menu Lateral de Navegação do Admin */}
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
                    <Text>{link.icon}</Text> {/* <<< Usamos o emoji aqui */}
                    <Text>{link.label}</Text>
                  </Group>
                </NavLink>
              ))}
            </nav>
          </Paper>
        </Grid.Col>

        {/* Conteúdo Principal do Painel de Admin */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Paper withBorder p="xl" radius="md" h="100%">
            <Outlet />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}