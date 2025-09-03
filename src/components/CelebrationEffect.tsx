// src/components/CelebrationEffect.tsx
import classes from './CelebrationEffect.module.css';

// Função para gerar um número aleatório em um intervalo
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Lista de emojis que você quer que apareçam. Sinta-se à vontade para mudar!
const EMOJIS = ['✨', '🤖', '🚀', '🎉', '🎊', '⭐'];

// Gera um array de 150 partículas para preencher a tela
const particles = Array.from({ length: 150 }).map(() => {
  const style = {
    left: `${random(0, 100)}%`, // Posição horizontal aleatória
    animationDelay: `${random(0, 10)}s`, // Atraso aleatório para que não comecem todos juntos
    animationDuration: `${random(7, 15)}s`, // Velocidade de queda aleatória
    fontSize: `${random(12, 30)}px`, // Tamanho do emoji aleatório
  };
  // Escolhe um emoji aleatório da nossa lista para cada partícula
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  return { style, emoji };
});

export function CelebrationEffect() {
  return (
    <div className={classes.celebrationContainer}>
      {particles.map((p, index) => (
        <div key={index} className={classes.particle} style={p.style}>
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
