import { Group, Text, ActionIcon } from '@mantine/core';
import classes from './Widget.module.css';
// Reutilize o seu componente MusicPlayer para a lógica, ou simplifique aqui
// Esta é uma versão simplificada para o exemplo.
// Você precisará integrar com a lógica real do seu MusicPlayer.

// Ícones de Música
const IconPlayerPlay = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 4v16l13-8z" /></svg> );
const IconPlayerPause = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 5h4v14h-4z" /><path d="M14 5h4v14h-4z" /></svg> );

export function MusicController() {
  // LÓGICA SIMPLIFICADA - Substitua pela lógica real do seu MusicPlayer
  const isPlaying = false; 
  const currentSong = "Nome da Música";

  return (
    <Group gap="xs" className={classes.widget}>
      <ActionIcon variant="transparent" color="gray" size="sm">
        {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
      </ActionIcon>
      <Text size="xs" truncate="end" style={{ maxWidth: 150 }}>
        {currentSong}
      </Text>
    </Group>
  );
}
