// src/components/MainLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalSound } from '../hooks/useGlobalSound';
import { StatusBanner } from './StatusBanner';
import { MusicPlayer } from './MusicPlayer'; // Importe o novo player
import { Container } from '@mantine/core';
import { VisitorCounter } from './VisitorCounter'; //
import { CelebrationEffect } from './CelebrationEffect';


export function MainLayout() {
  const location = useLocation();
  useGlobalSound();

  return (
    <>
      <CelebrationEffect />
      <Header />
      <StatusBanner />
{/* 2. ADICIONE O CONTADOR AQUI */}
      <Container py="md" style={{ textAlign: 'center' }}>
        <VisitorCounter />
      </Container>
      

      {/* Container para posicionar o player */}
      <Container py="md">
        <MusicPlayer />
      </Container>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>


      <Footer />
    </>
  );

}


