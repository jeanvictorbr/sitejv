import { Group, Popover, Text, Skeleton } from '@mantine/core';
import { useDiscordStats } from '../../hooks/useDiscordStats';
import classes from './Widget.module.css';

// Ícone do Discord
const IconDiscord = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5" /><path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.665 -11.5c1.457 -1.015 3 -1.34 4.5 -1.5l1 2.5" /></svg> );

export function DiscordStatus() {
  const { presenceCount, memberCount, loading } = useDiscordStats();

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Group gap="xs" className={classes.widget} style={{ cursor: 'pointer' }}>
          <IconDiscord size={18} />
          {loading ? (
            <Skeleton height={12} width={50} />
          ) : (
            <Text size="xs">{presenceCount} Online</Text>
          )}
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          <Text span c="cyan" fw={700}>{presenceCount}</Text> Online
        </Text>
        <Text size="sm">
          <Text span fw={700}>{memberCount}</Text> Membros
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
