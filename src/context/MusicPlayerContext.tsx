import React, { createContext, useContext, useState, useMemo, useRef, useCallback } from 'react';

const songs = [
  { title: "Música 1", artist: "Artista 1", src: "/music/song1.mp3" },
  { title: "Música 2", artist: "Artista 2", src: "/music/song2.mp3" },
  // Adicione mais músicas aquix
];

interface MusicContextType {
  isPlaying: boolean;
  currentSong: typeof songs[0];
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const MusicPlayerContext = createContext<MusicContextType | undefined>(undefined);

export const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const nextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  }, []);

  const prevSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  }, []);
  
  // Efeito para tocar a música quando o índice ou estado de play muda
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].src;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Erro ao tocar música:", e));
      }
    }
  }, [currentSongIndex, isPlaying]);

  const value = useMemo(() => ({
    isPlaying,
    currentSong: songs[currentSongIndex],
    togglePlay,
    nextSong,
    prevSong,
  }), [isPlaying, currentSongIndex, togglePlay, nextSong, prevSong]);

  return (
    <MusicPlayerContext.Provider value={value}>
      <audio ref={audioRef} />
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
