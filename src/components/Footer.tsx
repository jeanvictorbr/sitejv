import { Container, Group, ActionIcon, Text, Stack } from '@mantine/core';
import { useDiscordStats } from '../hooks/useDiscordStats'; // Removido se não for mais usado
import classes from './Footer.module.css';

// ... Ícones ...
const IconBrandDiscord = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5" /><path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.665 -11.5c1.457 -1.015 3 -1.34 4.5 -1.5l1 2.5" /></svg> );

export function Footer() {
  // ▼▼▼ REMOVIDO o hook useDiscordStats daqui ▼▼▼

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Stack align="center" gap="xs">
          <Text c="dimmed" size="sm">
            © {new Date().getFullYear()} JV Store. Todos os direitos reservados.
          </Text>
          {/* ▼▼▼ REMOVIDA a seção de estatísticas do Discord ▼▼▼ */}
        </Stack>
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="https://discord.gg/jv-software" target="_blank">
            <IconBrandDiscord style={{ width: 18, height: 18 }} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
