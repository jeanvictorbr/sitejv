import { useState, useEffect } from 'react';

// ▼▼▼ CORREÇÃO: Usando a API de convite para dados precisos com o novo Server ID ▼▼▼
// Este é um código de convite público que aponta para o seu servidor ID 1302492815409938514
const DISCORD_INVITE_CODE = 'WsB9vygB3c'; 

interface DiscordStats {
  presenceCount: number | null;
  memberCount: number | null;
  loading: boolean;
  error: string | null;
}

export const useDiscordStats = (): DiscordStats => {
  const [stats, setStats] = useState<Omit<DiscordStats, 'loading' | 'error'>>({
    presenceCount: null,
    memberCount: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // A API de convites é a forma mais confiável de obter contagens de membros.
        const response = await fetch(`https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`);
        
        if (!response.ok) {
          throw new Error('Não foi possível buscar os dados do convite do Discord. Verifique se o convite é válido.');
        }
        
        const data = await response.json();

        setStats({ 
          presenceCount: data.approximate_presence_count || 0,
          memberCount: data.approximate_member_count || 0,
        });

      } catch (err: any) {
        setError(err.message);
        console.error("Erro no hook useDiscordStats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { ...stats, loading, error };
};
