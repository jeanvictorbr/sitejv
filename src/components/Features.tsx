// src/components/Features.tsx
import { Title, SimpleGrid, Text, Container, Button, Group, Grid, Card } from '@mantine/core';
import { Link } from 'react-router-dom';

const featuresData = [
  {
    emoji: '🛡️',
    title: 'FactionFlow',
    description: 'A solução definitiva para servidores de facções. Gerencie membros, economias, territórios e guerras de forma totalmente automatizada e intuitiva.',
    link: '/bots/factionflow',
  },
  {
    emoji: '🎫',
    title: 'TicketUltra',
    description: 'Ofereça um suporte ágil e organizado para sua comunidade. Crie painéis, gerencie atendimentos e registre tudo com um sistema de tickets completo.',
    link: '/bots/ticketultra',
  },
];

export function Features() {
  return (
    <Container id="bots" size="lg"> {/* <<< A MARGEM vertical (py="xl") FOI REMOVIDA AQUI */}
      <Card shadow="md" radius="md" withBorder ta="center" style={{backgroundColor: 'rgba(26, 27, 30, 0.5)', backdropFilter: 'blur(5px)'}}>
        <Title order={2}>
          Nossas Ferramentas
        </Title>
        <Text c="dimmed" mt="md" maw={580} mx="auto">
          Soluções robustas e confiáveis para levar a administração do seu servidor a outro patamar.
        </Text>
      </Card>

      <Grid mt={50} gutter="xl">
        {featuresData.map((feature) => (
          <Grid.Col span={{ base: 12, sm: 6 }} key={feature.title}>
            <Card shadow="md" radius="md" withBorder h="100%" style={{backgroundColor: 'rgba(26, 27, 30, 0.5)', backdropFilter: 'blur(5px)'}}>
              <Group align="center">
                <Text fz={32}>{feature.emoji}</Text>
                <Title order={3}>{feature.title}</Title>
              </Group>
              <Text c="dimmed" fz="sm" mt="md">
                {feature.description}
              </Text>
              
              <div style={{ flexGrow: 1 }} /> 
         
              <Button component={Link} to={feature.link} variant="light" mt="xl" fullWidth>
                Saiba Mais
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}