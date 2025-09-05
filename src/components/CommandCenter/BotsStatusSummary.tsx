import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Popover, Stack, Badge, Skeleton, ActionIcon, Box } from '@mantine/core';
import classes from './Widget.module.css';

// Ícone de Robô
const IconRobot = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1-1v-3l1-1v-1a2 2 0 0 1 2-2z" /><path d="M10 16h4" /><circle cx="8.5" cy="11.5" r=".5" fill="currentColor" /><circle cx="15.5" cy="11.5" r=".5" fill="currentColor" /><path d="M9 7l-1-4" /><path d="M15 7l1-4" /></svg> );

interface BotStatus { name: string; status: 'Operacional' | 'Instável' | 'Manutenção'; }
const statusColors: Record<BotStatus['status'], string> = { Operacional: 'teal', Instável: 'orange', Manutenção: 'red' };

export function BotsStatusSummary() {
  const [statuses, setStatuses] = useState<BotStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      const { data } = await supabase.from('bot_status').select('name, status');
      setStatuses(data as BotStatus[] || []);
      setLoading(false);
    };
    fetchStatuses();
  }, []);

  const hasIssue = statuses.some(s => s.status !== 'Operacional');

  return (
    <Popover width={240} position="bottom" withArrow shadow="md" openDelay={200}>
      <Popover.Target>
        <ActionIcon variant="transparent" color="gray" className={classes.widgetIcon}>
          <IconRobot size={20} />
          <Box className={classes.statusIndicator} data-issue={hasIssue} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          {loading ? <Skeleton height={20} count={2} /> : statuses.map(bot => (
            <div key={bot.name} className={classes.statusRow}>
              <Text size="sm">{bot.name}</Text>
              <Badge color={statusColors[bot.status]} variant="light" size="sm">{bot.status}</Badge>
            </div>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
