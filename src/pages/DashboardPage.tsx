import { Container, Title, Text, Grid, Paper } from '@mantine/core';
import { useAuth } from '../context/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './Dashboard.module.css';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <Container py="xl" size="xl">
      <Title order={1}>Painel do Usuário</Title>
      <Text c="dimmed">Bem-vindo de volta, {user?.user_metadata.display_name || 'usuário'}!</Text>

      <Grid mt="xl">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <nav>
              <NavLink to="/dashboard" end className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}>Visão Geral</NavLink>
              <NavLink to="/dashboard/my-bots" className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}>Meus Bots</NavLink>
              <NavLink to="/dashboard/subscription" className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}>Assinatura</NavLink>
              <a href="#" className={classes.link}>Configurações</a>
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