import { Paper, Group, Divider } from '@mantine/core';
import classes from './CommandCenter.module.css';
import { DiscordStatus } from './CommandCenter/DiscordStatus';
import { BotsStatusSummary } from './CommandCenter/BotsStatusSummary';
import { NewsNotification } from './CommandCenter/NewsNotification';
import { MusicController } from './CommandCenter/MusicController';

export function CommandCenter() {
  return (
    <Paper withBorder className={classes.commandCenter}>
      <Group justify="space-between" h="100%">
        <Group gap="xs">
          <DiscordStatus />
          <Divider orientation="vertical" />
          <BotsStatusSummary />
        </Group>
        <Group gap="xs">
          <NewsNotification />
          <Divider orientation="vertical" />
          <MusicController />
        </Group>
      </Group>
    </Paper>
  );
}
