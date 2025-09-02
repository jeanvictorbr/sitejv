import { useEffect } from 'react'; // 'React' foi removido daqui
import classes from './MouseGlow.module.css';

export function MouseGlow() {
  useEffect(() => {
    const glow = document.createElement('div');
    glow.className = classes.mouseGlow;
    document.body.appendChild(glow);

    const onMouseMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX - glow.offsetWidth / 2}px`;
      glow.style.top = `${e.clientY - glow.offsetHeight / 2}px`;
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (document.body.contains(glow)) {
        document.body.removeChild(glow);
      }
    };
  }, []);

  return null;
}