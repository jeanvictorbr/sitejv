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

const DISCORD_INVITE_URL = 'https://discord.gg/jv-software'; // SEU LINK DO DISCORD AQUI

export function CommunityStatusColumn() {
  const [botStatuses, setBotStatuses] = useState<BotStatus[]>([]);
  const [latestFeedback, setLatestFeedback] = useState<Feedback | null>(null);
  const { presenceCount, loading: discordLoading } = useDiscordStats();

  useEffect(() => {
    // Busca status dos bots
    const fetchBotStatuses = async () => {
      const { data } = await supabase.from('bot_status').select('*').order('name');
      setBotStatuses(data as BotStatus[] || []);
    };
    // Busca último feedback 5 estrelas
    const fetchLatestFeedback = async () => {
      const { data } = await supabase.from('feedbacks').select('comment, user_display_name').eq('is_visible', true).eq('rating', 5).order('created_at', { ascending: false }).limit(1).single();
      setLatestFeedback(data);
    };

    fetchBotStatuses();
    fetchLatestFeedback();
  }, []);

  return (
    <Paper withBorder p="md" radius="md" className={classes.columnPaper}>
      <Title order={4} className={classes.columnTitle}>Status da Comunidade</Title>
      <Stack gap="lg" mt="md">
        {/* Status dos Bots */}
        <div className={classes.section}>
          <Text size="sm" fw={700} className={classes.sectionTitle}>STATUS DOS BOTS</Text>
          <Stack gap="xs" mt="xs">
            {botStatuses.length > 0 ? botStatuses.map(bot => (
              <Tooltip label={bot.description || bot.status} key={bot.name} position="right" withArrow>
                <Group justify="space-between" className={classes.statusItem}>
                  <Text size="sm">{bot.name}</Text>
                  <Badge color={statusColors[bot.status]} size="sm" variant="dot">{bot.status}</Badge>
                </Group>
              </Tooltip>
            )) : <Skeleton height={20} count={2} />}
          </Stack>
        </div>

        <Divider />

        {/* Discord Stats */}
        <div className={classes.section}>
            <Text size="sm" fw={700} className={classes.sectionTitle}>COMUNIDADE DISCORD</Text>
            {discordLoading ? <Skeleton height={40} mt="xs" /> : (
                <Group justify="center" mt="sm">
                    <RingProgress
                        size={80}
                        thickness={6}
                        roundCaps
                        sections={[{ value: (presenceCount || 0) > 0 ? 100 : 0, color: 'cyan' }]}
                        label={<Text c="cyan" fw={700} ta="center" size="lg">{presenceCount || 0}</Text>}
                    />
                    <Text ta="center" size="sm">Membros Online</Text>
                </Group>
            )}
            <Button component="a" href={DISCORD_INVITE_URL} target="_blank" fullWidth mt="md" variant="light">
                Junte-se a Nós
            </Button>
        </div>
        
        {latestFeedback && (
            <>
                <Divider />
                <div className={classes.section}>
                    <Text size="sm" fw={700} className={classes.sectionTitle}>ÚLTIMO FEEDBACK ⭐⭐⭐⭐⭐</Text>
                    <Paper withBorder radius="sm" p="xs" mt="xs" className={classes.feedbackQuote}>
                        <Text size="sm" truncate="end">"{latestFeedback.comment}"</Text>
                        <Text size="xs" ta="right" mt={5}>- {latestFeedback.user_display_name}</Text>
                    </Paper>
                </div>
            </>
        )}
      </Stack>
    </Paper>
  );
}
