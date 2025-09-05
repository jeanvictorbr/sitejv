import { useState, useEffect } from 'react';

// ▼▼▼ CORREÇÃO: ID do servidor "JV SOFTWARE" adicionado aqui ▼▼▼
const DISCORD_SERVER_ID = '1302492815409938514'; 

interface DiscordStats {
  presenceCount: number | null;
  loading: boolean;
  error: string | null;
}

export const useDiscordStats = (): DiscordStats => {
  const [presenceCount, setPresenceCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!response.ok) {
          throw new Error('Não foi possível buscar os dados do widget do Discord. Verifique se o widget está habilitado no seu servidor.');
        }
        const data = await response.json();
        setPresenceCount(data.presence_count);
      } catch (err: any) {
        setError(err.message);
        console.error("Erro no hook useDiscordStats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { presenceCount, loading, error };
};
