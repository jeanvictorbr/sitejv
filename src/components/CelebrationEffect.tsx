// src/components/CelebrationEffect.tsx
import classes from './CelebrationEffect.module.css';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Gera um array de 150 partículas para o efeito de neve
const particles = Array.from({ length: 150 }).map(() => {
  const size = `${random(2, 6)}px`; // Tamanho da neve, de 2px a 6px
  const style = {
    width: size,
    height: size,
    left: `${random(0, 100)}%`, // Posição horizontal aleatória
    animationDelay: `${random(0, 10)}s`, // Atraso aleatório para iniciar
    animationDuration: `${random(8, 15)}s`, // Velocidade de queda aleatória
    opacity: random(0.3, 0.8), // Opacidade aleatória para um efeito mais natural
    filter: `blur(${random(0, 1)}px)`, // Leve desfoque para suavizar
  };
  return { style };
});

export function CelebrationEffect() {
  return (
    <div className={classes.celebrationContainer}>
      {particles.map((p, index) => (
        <div key={index} className={classes.particle} style={p.style} />
      ))}
    </div>
  );
}
