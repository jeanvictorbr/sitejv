import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useDiscordStats } from '../hooks/useDiscordStats';
import { Text, Paper, Button, Skeleton, Stack, Group, Badge, Tooltip } from '@mantine/core';
import classes from './CommunityStatusColumn.module.css';

interface BotStatus {
  name: string;
  status: 'Operacional' | 'Instável' | 'Manutenção';
  description?: string;
}

const statusColors: Record<BotStatus['status'], string> = {
  Operacional: 'teal',
  Instável: 'orange',
  Manutenção: 'red',
};

const DISCORD_INVITE_URL = 'https://discord.gg/WsB9vygB3c';

export function CommunityStatusColumn() {
  const [botStatuses, setBotStatuses] = useState<BotStatus[]>([]);
  const { presenceCount, memberCount, loading: discordLoading } = useDiscordStats();

  useEffect(() => {
    const fetchBotStatuses = async () => {
      const { data } = await supabase.from('bot_status').select('*').order('name');
      setBotStatuses(data as BotStatus[] || []);
    };
    fetchBotStatuses();
  }, []);

  return (
    <Stack gap="lg">
      {/* Módulo de Status dos Bots */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text component="h3" className={classes.mainModuleTitle}>Status dos Bots</Text>
        <Stack gap="sm" mt="sm">
          {botStatuses.length > 0 ? botStatuses.map(bot => (
            <Tooltip label={bot.description || bot.status} key={bot.name} position="right" withArrow>
              {/* ▼▼▼ CORREÇÃO: Subseção com fundo cinza para cada bot ▼▼▼ */}
              <Paper withBorder className={classes.subModule}>
                <Text size="sm" fw={700} className={classes.botName}>{bot.name}</Text>
                <Badge color={statusColors[bot.status]} variant="light" radius="sm" fullWidth>
                  {bot.status}
                </Badge>
              </Paper>
            </Tooltip>
          )) : <Skeleton height={40} count={2} radius="sm" />}
        </Stack>
      </Paper>

      {/* Módulo do Discord */}
      <Paper withBorder p="md" radius="md" className={classes.module}>
        <Text component="h3" className={classes.mainModuleTitle}>Comunidade</Text>
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
    </Stack>
  );
}
