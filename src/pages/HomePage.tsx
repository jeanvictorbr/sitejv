import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ValueProposition } from '../components/ValueProposition';
import { Marquee } from '../components/Marquee';
import { Faq } from '../components/Faq';
import { motion } from 'framer-motion';

// 1. Importe os DOIS componentes flutuantes
import { AgentChat } from '../components/AgentChat/AgentChat';
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

      {/* 2. Adicione os DOIS componentes aqui */}
      <AgentChat />
      <DiscordPulseCard />
    </>
  );
}