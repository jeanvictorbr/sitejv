// src/pages/LoginPage.tsx
import { Container, Title, Text, Button, Center, Paper, Group } from '@mantine/core';
import { supabase } from '../lib/supabaseClient'; // Importa nosso cliente Supabase
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function LoginPage() {
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          scopes: 'identify email',
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao fazer login com Discord via Supabase:", error);
    }
  };

  // Se o usuário já estiver logado, redireciona para o dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container py="xl">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Center>
          <Group>
            <Title order={2}>Acessar Painel</Title>
            <Text>Faça login com sua conta do Discord para continuar.</Text>
            <Button onClick={handleLogin} size="lg" variant="filled" color="indigo" mt="md">
              Login com Discord
            </Button>
          </Group>
        </Center>
      </Paper>
    </Container>
  );
}