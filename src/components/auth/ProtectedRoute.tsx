// src/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // LOG 4: O que o segurança está vendo?
  console.log('[ProtectedRoute] Verificando acesso...', { 
    loading: loading, 
    user: user?.displayName || null 
  });

  if (loading) {
    return null; 
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}