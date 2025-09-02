import { useState, useEffect, useRef, useCallback } from 'react';

export const useTextScramble = (initialText: string, interval = 3000) => {
  const [text, setText] = useState(initialText);
  // A CORREÇÃO ESTÁ AQUI: Demos um valor inicial 'null'
  const frameRequest = useRef<number | null>(null);
  const frame = useRef(0);
  const queue = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);

  const chars = '!<>-_\\/[]{}—=+*^?#________';

  const update = useCallback(() => {
    let output = '';
    let complete = 0;
    for (let i = 0, n = queue.current.length; i < n; i++) {
      let { from, to, start, end, char } = queue.current[i];
      if (frame.current >= end) {
        complete++;
        output += to;
      } else if (frame.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue.current[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }
    setText(output);
    if (complete !== queue.current.length) {
      frameRequest.current = requestAnimationFrame(update);
      frame.current++;
    }
  }, []);

  const scramble = useCallback((newText: string) => {
    frame.current = 0;
    queue.current = initialText.split('').map((from, i) => {
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      return { from, to: newText[i] || '', start, end };
    });
    if(frameRequest.current) {
      cancelAnimationFrame(frameRequest.current);
    }
    update();
  }, [initialText, update]);

  useEffect(() => {
    const handle = setInterval(() => {
      scramble(initialText);
    }, interval);
    scramble(initialText);
    return () => clearInterval(handle);
  }, [initialText, interval, scramble]);

  return text;
};