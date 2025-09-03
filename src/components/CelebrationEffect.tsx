// src/components/CelebrationEffect.tsx
import classes from './CelebrationEffect.module.css';

// Função para gerar um número aleatório em um intervalo
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Criando as partículas com estilos aleatórios
const particles = Array.from({ length: 150 }).map(() => {
  const size = `${random(1, 4)}px`;
  const style = {
    width: size,
    height: size,
    left: `${random(0, 100)}%`,
    animationDelay: `${random(0, 10)}s`,
    animationDuration: `${random(5, 10)}s`,
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
