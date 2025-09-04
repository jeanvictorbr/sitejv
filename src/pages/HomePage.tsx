import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ValueProposition } from '../components/ValueProposition';
import { Marquee } from '../components/Marquee';
import { Faq } from '../components/Faq';
import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom'; // 1. Importa o Link para navegação
import { DiscordPulseCard } from '../components/DiscordPulseCard';

const sectionAnimation: any = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
};

export function HomePage() {
  return (
    <>
      <Hero />
 
      <div style={{ marginTop: '2rem' }}>
        <Marquee />
      </div>

      {/* 2. Botão agora é um Link que leva para a página /chat */}
      <motion.div {...sectionAnimation} style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
        <Button
          component={Link}
          to="/chat"
          size="xl"
          radius="md"
          variant="gradient"
          gradient={{ from: 'red', to: 'orange', deg: 45 }}
          style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 0, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 0, 0.4)';
          }}
        >
          Tirar Todas as Minhas Dúvidas
        </Button>
      </motion.div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <Features />
        </motion.div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <ValueProposition />
        </motion.div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <motion.div {...sectionAnimation}>
          <Faq />
        </motion.div>
      </div>

      {/* 3. O antigo <AgentChat/> foi removido e mantemos apenas o card do Discord */}
      <DiscordPulseCard />
    </>
  );
}
