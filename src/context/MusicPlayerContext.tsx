import { Group, Text, ActionIcon, Popover, Box } from '@mantine/core';
import { useMusicPlayer } from '../../context/MusicPlayerContext'; // Caminho corrigido
import classes from './Widget.module.css';

// ... Ícones ...
const IconPlayerPlay = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 4v16l13-8z" /></svg> );
const IconPlayerPause = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 5h4v14h-4z" /><path d="M14 5h4v14h-4z" /></svg> );
const IconPlayerSkipBack = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 5v14l-12-7z" /><path d="M4 5v14" /></svg> );
const IconPlayerSkipForward = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 5v14l12-7z" /><path d="M20 5v14" /></svg> );

export function MusicController() {
  const { isPlaying, togglePlay, nextSong, prevSong, currentSong } = useMusicPlayer();

  return (
    <Popover width={280} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Group gap="xs" className={classes.widget} style={{ cursor: 'pointer' }}>
          <Text size="xs" c="cyan">♪</Text>
          <Text size="xs" truncate="end" style={{ maxWidth: 120 }}>
            {currentSong?.title || "Música"}
          </Text>
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <Box p="xs">
          <Text ta="center" size="sm" fw={500} truncate="end">{currentSong?.title}</Text>
          <Text ta="center" size="xs" c="dimmed">{currentSong?.artist}</Text>
          <Group justify="center" mt="sm">
            <ActionIcon onClick={prevSong} variant="default"><IconPlayerSkipBack size={16} /></ActionIcon>
            <ActionIcon onClick={togglePlay} variant="default" size="lg">
              {isPlaying ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
            </ActionIcon>
            <ActionIcon onClick={nextSong} variant="default"><IconPlayerSkipForward size={16} /></ActionIcon>
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
}
