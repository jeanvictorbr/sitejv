// src/pages/HomePage.tsx
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ValueProposition } from '../components/ValueProposition';
import { Marquee } from '../components/Marquee';
import { Faq } from '../components/Faq';
import { motion } from 'framer-motion';
import { DiscordPulseCard } from '../components/DiscordPulseCard';
import { AgentChat } from './AgentChat/AgentChat';


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
      <DiscordPulseCard />
      {/* AQUI ESTÁ A CORREÇÃO: Adicionamos a margem de topo para espaçar do Hero */}
      <div style={{ marginTop: '2rem' }}>
        <Marquee />
      </div>
      <Hero />
       <AgentChat />
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
    </>
  );

}




