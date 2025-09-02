// src/components/MusicPlayer.tsx
import { useRef, useState, useEffect } from 'react';
import { Paper, ActionIcon, Slider, Progress, Text } from '@mantine/core';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1); 
  const [progress, setProgress] = useState(0); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlist = [
    { title: 'Penelope', src: '/musicas/penelope.mp3' }, 
    { title: 'Comedinha', src: '/musicas/comedinha.mp3' }, 
    { title: 'Marra', src: '/musicas/marra.mp3' }, 
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log('Reprodução automática bloqueada pelo navegador.'));
    }
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = value;
      setVolume(value);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(false);
  };

  return (
    <Paper 
      withBorder 
      p="xs" 
      radius="md" 
      style={{ 
        backgroundColor: 'rgba(26, 27, 30, 0.8)', 
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        gap: 'sm',
        height: '48px'
      }}
    >
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex].src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleNext()}
        preload="auto"
      />
      
      <ActionIcon variant="transparent" size="md" onClick={handlePrev}>
        ⏪
      </ActionIcon>

      <ActionIcon variant="transparent" size="md" onClick={handlePlayPause}>
        {isPlaying ? '⏸️' : '▶️'}
      </ActionIcon>

      <ActionIcon variant="transparent" size="md" onClick={handleNext}>
        ⏩
      </ActionIcon>
      
      <Progress value={progress} style={{ flexGrow: 1, height: '4px' }} radius="xl" color="blue" />

      <Text size="xs" c="dimmed" style={{ minWidth: '60px', textAlign: 'center' }}>
        {playlist[currentTrackIndex].title}
      </Text>

      <ActionIcon variant="transparent" size="md" onClick={handleMuteToggle}>
        {volume > 0 && !audioRef.current?.muted ? '🔊' : '🔇'}
      </ActionIcon>
      <Slider
        value={volume}
        onChange={handleVolumeChange}
        min={0}
        max={1}
        step={0.01}
        style={{ width: 80 }}
        thumbSize={12}
        color="blue"
      />
    </Paper>
  );
}