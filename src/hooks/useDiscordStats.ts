import { useState, useEffect } from 'react';

// ▼▼▼ CORREÇÃO: ID do servidor "JV SOFTWARE" e nova interface de dados ▼▼▼
const DISCORD_SERVER_ID = '1302492815409938514'; 

interface DiscordStats {
  presenceCount: number | null;
  memberCount: number | null; // Adicionado total de membros
  loading: boolean;
  error: string | null;
}

export const useDiscordStats = (): DiscordStats => {
  const [presenceCount, setPresenceCount] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null); // Adicionado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usamos um proxy para evitar problemas de CORS
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`)}`);
        if (!response.ok) throw new Error('Falha na requisição ao proxy.');
        
        const contents = await response.json();
        const data = JSON.parse(contents.contents);

        if (!data || data.message === 'Unknown Guild') {
          throw new Error('Não foi possível buscar os dados do widget do Discord. Verifique se o widget está habilitado no seu servidor e o ID está correto.');
        }
        setPresenceCount(data.presence_count);
        setMemberCount(data.members.length); // API do widget só lista membros online/em voz
      } catch (err: any) {
        setError(err.message);
        console.error("Erro no hook useDiscordStats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { presenceCount, memberCount, loading, error };
};
