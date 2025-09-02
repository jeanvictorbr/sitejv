// src/components/Header.tsx
import { Container, Group, Burger, Drawer, Title, Button, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Header.module.css';
import { useTextScramble } from '../hooks/useTextScramble';

const links = [
  { link: '/', label: 'Início' },
  { link: '/bots/factionflow', label: 'FactionFlow' },
  { link: '/bots/ticketultra', label: 'TicketUltra' },
  { link: '/pricing', label: 'Preços' },
  { link: '/request-bot', label: 'Solicitar Bot' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const animatedLogoText = useTextScramble('JV Store');

  const items = links.map((link) => (
    <motion.div key={link.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link to={link.link} className={classes.link} onClick={close}>
        {link.label}
      </Link>
    </motion.div>
  ));

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Title 
          order={2} 
          className={classes.logoTitle} 
          dangerouslySetInnerHTML={{ __html: animatedLogoText }} 
        />
        
        <Group gap={50} visibleFrom="sm">
          {items}
          <Divider orientation="vertical" h={20} />
          {/* GRUPO DE BOTÕES DE AÇÃO */}
          <Group>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button component="a" href="#" variant='light'>Comunidade Discord</Button>
            </motion.div>
            
            {/* ▼▼▼ BOTÃO NOVO ADICIONADO AQUI ▼▼▼ */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              {/* No futuro, este Link levará para '/login' ou '/dashboard' */}
              <Button component={Link} to="/login" variant='gradient' /*...*/>
    Acessar Painel
</Button>
            </motion.div>
          </Group>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        
        <Drawer opened={opened} onClose={close} position="right" title="Navegação" hiddenFrom="sm">
            <div className={classes.drawerContent}>
                {items}
                <Divider my="sm" />
                <Button component="a" href="#" variant='light' mt="md">Comunidade Discord</Button>
                {/* ▼▼▼ BOTÃO NOVO ADICIONADO NO MENU MOBILE ▼▼▼ */}
                <Button component={Link} to="#" variant='gradient' gradient={{from: 'cyan', to: 'blue'}} mt="md">
                  Acessar Painel
                </Button>
            </div>
        </Drawer>
      </Container>
    </header>
  );
}