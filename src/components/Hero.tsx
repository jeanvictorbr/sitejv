// src/components/Hero.tsx
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ParticlesBackground } from './ParticlesBackground';

export function Hero() {
  return (
    <Container
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticlesBackground />

      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '40px',
        paddingBottom: '2rem', // <<< CORREÇÃO AQUI para espaçar do letreiro
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            background: 'linear-gradient(to right, #22d3ee, #0ea5e9, #22d3ee)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <Title
            order={1}
            style={{ fontSize: 'clamp(2rem, 10vw, 4.5rem)' }}
          >
            Libere o Potencial do seu Servidor
          </Title>
        </motion.div>

        <Text c="dimmed" mt="md" size="xl" maw={600}>
          Nossos bots são a chave para otimizar sua comunidade e atrair novos membros, garantindo uma gestão fluída e sem falhas.
        </Text>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Group mt="xl">
            <Button
              component={Link}
              to="/bots/factionflow"
              size="lg"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'blue' }}
            >
              Conheça o FactionFlow
            </Button>
            <Button
              component={Link}
              to="/bots/ticketultra"
              size="lg"
              variant="light"
            >
              Conheça o TicketUltra
            </Button>
          </Group>
        </motion.div>
      </div>
    </Container>
  );
}