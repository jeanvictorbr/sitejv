// src/components/Footer.tsx
import { Container, Group, Text, Badge, Divider } from '@mantine/core'; // Adicionado Divider
import classes from './Footer.module.css';
import { useDiscordStats } from '../hooks/useDiscordStats';

export function Footer() {
  const year = new Date().getFullYear();
  const { onlineCount, totalCount } = useDiscordStats(); // Pega os dois valores do hook

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Text>JV Store</Text>

        {/* Novo grupo para exibir as duas estatísticas */}
        <Group gap="md">
          {onlineCount !== null && (
            <Badge color="green" variant="light" size="lg">
              {onlineCount} membros online
            </Badge>
          )}

          {totalCount !== null && (
            <Badge color="blue" variant="light" size="lg">
              {totalCount} total de membros na comunidade
            </Badge>
          )}
        </Group>

        <Text c="dimmed" size="sm">© {year} JV Store. Todos os direitos reservados.</Text>
      </Container>
    </footer>
  );
}