// src/components/auth/AdminRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUserData } from '../../hooks/useUserData';
import { Center, Loader } from '@mantine/core';

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { userData, loading: userDataLoading } = useUserData();

  // Mostra o loader enquanto a autenticação ou os dados do usuário estão carregando
  if (authLoading || userDataLoading) {
    return (
        <Center style={{ height: '100vh' }}>
            <Loader />
        </Center>
    );
  }

  // Se não há usuário logado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário está logado, MAS NÃO É ADMIN, redireciona para o dashboard normal
  if (!userData?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se passou por todas as verificações, o usuário é um admin. Mostra a página.
  return <>{children}</>;
}