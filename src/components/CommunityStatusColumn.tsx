import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useDiscordStats } from '../hooks/useDiscordStats';
import { Text, Paper, Button, Skeleton, Stack, Group, Badge, Divider, Tooltip } from '@mantine/core';
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
  const { presenceCount, memberCount, loading: discordLoading } = useDiscordStats();

  useEffect(() => {
    const fetchBotStatuses = async () => {
      const { data } = await supabase.from('bot_status').select('*').order('name');
      setBotStatuses(data as BotStatus[] || []);
    };
    const fetchLatestFeedback = async () => {
      const { data } = await supabase.from('feedbacks').select('comment, user_display_name').eq('is_visible', true).eq('rating', 5).order('created_at', { ascending: false }).limit(1).single();
      setLatestFeedback(data);
    };

    fetchBotStatuses();
    fetchLatestFeedback();
  }, []);

  return (
    // ▼▼▼ CORREÇÃO: Layout agora usa sub-módulos (Paper) dentro de um Stack ▼▼▼
    <Stack gap="lg">
      {/* Módulo de Status dos Bots */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text size="sm" fw={700} className={classes.moduleTitle}>STATUS DOS BOTS</Text>
        <Stack gap="xs" mt="xs">
          {botStatuses.length > 0 ? botStatuses.map(bot => (
            <Tooltip label={bot.description || bot.status} key={bot.name} position="right" withArrow>
              <div className={classes.statusItem}>
                <Text size="sm" fw={700} className={classes.botName}>{bot.name}</Text>
                <Badge color={statusColors[bot.status]} size="sm" variant="light" radius="sm">{bot.status}</Badge>
              </div>
            </Tooltip>
          )) : <Skeleton height={20} count={2} radius="sm" />}
        </Stack>
      </Paper>

      {/* Módulo do Discord */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text size="sm" fw={700} className={classes.moduleTitle}>COMUNIDADE DISCORD</Text>
        {discordLoading ? <Skeleton height={60} mt="sm" radius="sm" /> : (
            <Group justify="space-around" mt="sm">
                <div className={classes.stat}>
                    <Text size="xl" fw={700} c="cyan">{presenceCount || 0}</Text>
                    <Text size="xs" c="dimmed">Online</Text>
                </div>
                <div className={classes.stat}>
                    <Text size="xl" fw={700}>{memberCount || '---'}</Text>
                    <Text size="xs" c="dimmed">Membros</Text>
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
