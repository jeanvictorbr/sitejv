import { useState, useEffect } from 'react';

export const useDiscordStats = () => {
  const [stats, setStats] = useState<{ presenceCount: number | null; memberCount: number | null }>({
    presenceCount: null,
    memberCount: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ▼▼▼ CÓDIGO DO SEU CONVITE DO DISCORD ▼▼▼
    const INVITE_CODE = 'jv-software'; 

    const apiUrl = `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`;

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Não foi possível buscar os dados do convite do Discord.');
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
