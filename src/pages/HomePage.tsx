import { Grid, Paper } from '@mantine/core';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ValueProposition } from '../components/ValueProposition';
import { Marquee } from '../components/Marquee';
import { Faq } from '../components/Faq';
import { motion } from 'framer-motion';
import { DiscordPulseCard } from '../components/DiscordPulseCard';
import { MusicPlayer } from '../components/MusicPlayer';
import { NewsColumn } from '../components/NewsColumn';
import classes from './HomePage.module.css';

const sectionAnimation: any = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: "easeOut" }
};

export function HomePage() {
  return (
    <div className={classes.homePageWrapper}>
      <Grid gutter="xl">
        {/* Coluna Esquerda: Player de Música */}
        <Grid.Col span={{ base: 12, lg: 2 }}>
          <Paper withBorder p="md" radius="md" className={classes.sideColumn}>
            <MusicPlayer />
          </Paper>
        </Grid.Col>

        {/* Coluna Central: Conteúdo Principal */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Hero />
          <div style={{ marginTop: '2rem' }}> <Marquee /> </div>
          <div style={{ marginTop: '2rem' }}>
            <motion.div {...sectionAnimation}> <Features /> </motion.div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <motion.div {...sectionAnimation}> <ValueProposition /> </motion.div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <motion.div {...sectionAnimation}> <Faq /> </motion.div>
          </div>
        </Grid.Col>

        {/* Coluna Direita: Novidades */}
        <Grid.Col span={{ base: 12, lg: 2 }}>
          <NewsColumn />
        </Grid.Col>
      </Grid>
      
      <DiscordPulseCard />
    </div>
  );
}
