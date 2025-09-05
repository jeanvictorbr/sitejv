import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useDiscordStats } from '../hooks/useDiscordStats';
import { Title, Text, Paper, Button, Skeleton, Stack, Group, RingProgress, Badge, Divider, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './CommunityStatusColumn.module.css';

interface BotStatus {
  name: string;
  status: 'Operacional' | 'Instável' | 'Manutenção';
  description?: string;
}
interface Feedback {
  comment: string;
  user_display_name: string;
}

const statusColors: Record<BotStatus['status'], string> = {
  Operacional: 'teal',
  Instável: 'orange',
  Manutenção: 'red',
};

const DISCORD_INVITE_URL = 'https://discord.gg/VxmmFpp7vD';

export function CommunityStatusColumn() {
  const [botStatuses, setBotStatuses] = useState<BotStatus[]>([]);
  const [latestFeedback, setLatestFeedback] = useState<Feedback | null>(null);
  const { presenceCount, loading: discordLoading } = useDiscordStats();

  useEffect(() => {
    // ... a lógica de busca de dados continua a mesma ...
    const fetchBotStatuses = async () => { /* ... */ };
    const fetchLatestFeedback = async () => { /* ... */ };
    fetchBotStatuses();
    fetchLatestFeedback();
  }, []);

  return (
    // ▼▼▼ CORREÇÃO: Layout agora usa sub-módulos (Paper) ▼▼▼
    <Stack gap="lg">
      {/* Módulo de Status dos Bots */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text size="sm" fw={700} className={classes.moduleTitle}>STATUS DOS BOTS</Text>
        <Stack gap="xs" mt="xs">
          {botStatuses.length > 0 ? botStatuses.map(bot => (
            <Tooltip label={bot.description || bot.status} key={bot.name} position="right" withArrow>
              <Group justify="space-between" className={classes.statusItem}>
                {/* ▼▼▼ CORREÇÃO: Estilo do nome do bot ▼▼▼ */}
                <Text size="sm" fw={700} className={classes.botName}>{bot.name}</Text>
                <Badge color={statusColors[bot.status]} size="sm" variant="light">{bot.status}</Badge>
              </Group>
            </Tooltip>
          )) : <Skeleton height={20} count={2} radius="sm" />}
        </Stack>
      </Paper>

      {/* Módulo do Discord */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text size="sm" fw={700} className={classes.moduleTitle}>COMUNIDADE DISCORD</Text>
        {discordLoading ? <Skeleton height={60} mt="sm" radius="sm" /> : (
            <Group justify="center" mt="sm">
                <RingProgress
                    size={70}
                    thickness={5}
                    roundCaps
                    sections={[{ value: (presenceCount || 0) > 0 ? 100 : 0, color: 'cyan' }]}
                    label={<Text c="cyan" fw={700} ta="center" size="md">{presenceCount || 0}</Text>}
                />
                <div>
                    <Text size="xs">Membros</Text>
                    <Text size="xs">Online</Text>
                </div>
            </Group>
        )}
        <Button component="a" href={DISCORD_INVITE_URL} target="_blank" fullWidth mt="md" variant="light">
            Junte-se a Nós
        </Button>
      </Paper>
      
      {/* Módulo de Feedback */}
      {latestFeedback && (
        <Paper withBorder p="md" radius="md" className={classes.module}>
            <Text size="sm" fw={700} className={classes.moduleTitle}>ÚLTIMO FEEDBACK ⭐⭐⭐⭐⭐</Text>
            <div className={classes.feedbackQuote}>
                <Text size="sm" truncate="end">"{latestFeedback.comment}"</Text>
                <Text size="xs" ta="right" mt={5}>- {latestFeedback.user_display_name}</Text>
            </div>
        </Paper>
      )}
    </Stack>
  );
}
