import { Text } from '@mantine/core';
import { useTextScramble } from '../hooks/useTextScramble';
import classes from './HackerPlaceholder.module.css';

export function HackerPlaceholder() {
  const animatedText = useTextScramble('JV STORE');

  return (
    <div className={classes.placeholderContainer}>
      <div className={classes.rays}>
        <div className={classes.ray}></div>
        <div className={classes.ray}></div>
        <div className={classes.ray}></div>
        <div className={classes.ray}></div>
      </div>
      <Text
        className={classes.hackerText}
        dangerouslySetInnerHTML={{ __html: animatedText }}
      />
    </div>
  );
}
