import { Paper, Group, Divider } from '@mantine/core';
import classes from './CommandCenter.module.css';
import { DiscordStatus } from './CommandCenter/DiscordStatus';
import { BotsStatusSummary } from './CommandCenter/BotsStatusSummary';
import { NewsNotification } from './CommandCenter/NewsNotification';
import { MusicController } from './CommandCenter/MusicController';

export function CommandCenter() {
  return (
    <Paper withBorder className={classes.commandCenter}>
      <Group justify="center" h="100%" gap="xl">
        <DiscordStatus />
        <Divider orientation="vertical" />
        <BotsStatusSummary />
        <Divider orientation="vertical" />
        <NewsNotification />
        <Divider orientation="vertical" />
        <MusicController />
      </Group>
    </Paper>
  );
}
