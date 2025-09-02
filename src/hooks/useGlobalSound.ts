// src/hooks/useGlobalSound.ts
import { useEffect } from 'react';

const CLICK_SOUND_PATH = '/sounds/click.mp3';
const HOVER_SOUND_PATH = '/sounds/hover.mp3';
const VOLUME = 0.9;

// Função para o som de clique
const playSoundOnClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.closest('button, a')) {
    const audio = new Audio(CLICK_SOUND_PATH);
    audio.volume = VOLUME;
    audio.play().catch(e => console.error("Não foi possível tocar o som de clique:", e));
  }
};

// Função para o som de hover
const playSoundOnHover = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.closest('button, a')) {
    const audio = new Audio(HOVER_SOUND_PATH);
    audio.volume = 0.3; // Volume mais baixo para ser sutil
    audio.play().catch(e => console.error("Não foi possível tocar o som de hover:", e));
  }
};

export const useGlobalSound = () => {
  useEffect(() => {
    // Adiciona o ouvinte de clique
    document.addEventListener('click', playSoundOnClick);
    
    // Adiciona o ouvinte de mouseover (hover)
    document.addEventListener('mouseover', playSoundOnHover);

    // Função de 'limpeza' que remove os dois ouvintes
    return () => {
      document.removeEventListener('click', playSoundOnClick);
      document.removeEventListener('mouseover', playSoundOnHover);
    };
  }, []); // O array vazio garante que isso rode apenas uma vez.
};