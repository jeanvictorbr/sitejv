```tsx
// src/components/CelebrationEffect.tsx
import classes from './CelebrationEffect.module.css';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Lista de emojis para a celebração
const EMOJIS = ['✨', '🤖', '🚀', '🎉', '🎊'];

const particles = Array.from({ length: 150 }).map(() => {
  const style = {
    left: `${random(0, 100)}%`,
    animationDelay: `${random(0, 10)}s`,
    animationDuration: `${random(5, 10)}s`,
    fontSize: `${random(10, 25)}px`, // Controlamos o tamanho com a fonte
  };
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
```
