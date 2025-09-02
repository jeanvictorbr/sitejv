// src/hooks/useDiscordStats.ts
import { useState, useEffect } from 'react';

export const useDiscordStats = () => {
  const [stats, setStats] = useState<{ onlineCount: number | null; totalCount: number | null }>({
    onlineCount: null,
    totalCount: null,
  });

  useEffect(() => {
    // ▼▼▼ COLOQUE O CÓDIGO DO SEU CONVITE DO DISCORD AQUI ▼▼▼
    const INVITE_CODE = 'VxmmFpp7vD'; 

    // Esta é a nova API, que busca dados do convite
    const apiUrl = `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        // A API de convite usa nomes diferentes para os dados
        const online = data.approximate_presence_count || 0;
        const total = data.approximate_member_count || 0;

        setStats({ onlineCount: online, totalCount: total });
      })
      .catch(err => console.error("Falha ao buscar stats do Discord via convite:", err));
  }, []);

  return stats;
};