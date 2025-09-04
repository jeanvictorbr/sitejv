import { Text, Paper, Group, Avatar } from '@mantine/core';
import { useDiscordStats } from '../hooks/useDiscordStats';
import classes from './DiscordPulseCard.module.css';

// Ícone do Discord em SVG para não depender de imagens externas
const DiscordIcon = () => (
    <svg height="100%" width="100%" viewBox="0 0 245 240" xmlns="http://www.w3.org/2000/svg"><path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z" fill="#fff"/><path d="M189.5 20.1h-134C44.2 20.1 35 29.3 35 40.6v135.2c0 11.3 9.2 20.5 20.5 20.5h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.3-9.2-20.5-20.5-20.5zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.6 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.9 1-27.9-1.2-5.7-1.5-11.1-3.6-16.1-6.4-3.2-1.7-6.2-3.8-8.9-6.1-1.5-1.2-2.8-2.6-4-4.2-2.7-3.6-4.6-8.4-4.6-8.4s4.6 7.5 16.6 11.1c-5.7-2.4-9-5.3-11-7-2.1-1.7-3.9-3.7-5.2-6.1-1.2-2.2-1.9-4.6-2.1-7.1-.2-2.6-.1-5.3.3-7.9.4-2.7.9-5.3 1.8-7.8s2.4-4.9 4.1-7.1c2-2.2 4.1-4.2 6.5-6 2.8-2.1 5.8-3.9 8.9-5.3 3.3-1.5 6.7-2.6 10.2-3.4 6.8-1.5 13.6-1.9 20.3-1.2 6.8.6 13.4 2.4 19.5 5.1a56.6 56.6 0 0 1 11.6 8.3c-2.1-1.5-4.2-2.8-6.4-4-1.2-.7-2.4-1.3-3.6-1.8-1.5-.7-3-1.3-4.5-1.8-1.7-.6-3.3-1.1-5-1.6-2.8-.8-5.6-1.3-8.4-1.6-5.6-.5-11.2-.5-16.7.1-11.3 1.2-22.1 4.6-31.7 10.3-6 3.6-11.4 7.9-16.1 13.2-3.2 3.6-5.8 7.5-7.7 11.6-2 4.2-3.2 8.7-3.6 13.3-.4 4.5.2 9 .8 13.5.5 3.7 1.6 7.3 3.1 10.7 1.9 4.2 4.5 8.1 7.7 11.6 3.5 3.8 7.6 7.1 12.1 9.8 4.7 2.8 9.7 4.9 15 6.4 5.4 1.5 11 2.3 16.6 2.4z" fill="#7289da"/></svg>
);

// URL do seu convite do Discord
const DISCORD_INVITE_URL = 'https://discord.gg/VxmmFpp7vD';

export function DiscordPulseCard() {
  const { presenceCount, loading, error } = useDiscordStats();

  if (loading || error) {
    return null; // Não mostra nada se estiver carregando ou der erro
  }

  return (
    <a href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer" className={classes.link}>
      <Paper withBorder radius="lg" p="xs" className={classes.card}>
        <Group>
          <Avatar size="md" color="transparent"><DiscordIcon /></Avatar>
          <div>
            <Text size="sm" fw={700}>Junte-se à comunidade</Text>
            <Group gap="xs">
              <div className={classes.pulse} />
              <Text size="xs">{presenceCount} membros online</Text>
            </Group>
          </div>
        </Group>
      </Paper>
    </a>
  );
}
