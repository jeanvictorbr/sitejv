// src/components/Header.tsx
import {
  Container,
  Group,
  Burger,
  Drawer,
  Title,
  Button,
  Divider,
  Menu,
  Avatar,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './Header.module.css';
import { useTextScramble } from '../hooks/useTextScramble';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';

const links = [
  { link: '/', label: 'Início' },
  { link: '/bots/factionflow', label: 'FactionFlow' },
  { link: '/bots/ticketultra', label: 'TicketUltra' },
  { link: '/pricing', label: 'Preços' },
  { link: '/feedbacks', label: 'Feedbacks' },
  { link: '/request-bot', label: 'Solicitar Bot' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const animatedLogoText = useTextScramble('JV Store');

  const { user, signOut } = useAuth();
  const { userData } = useUserData();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const items = links.map((link) => (
    <motion.div key={link.label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Link to={link.link} className={classes.link} onClick={close}>
        {link.label}
      </Link>
    </motion.div>
  ));

  const authControls = user ? (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src={user.user_metadata?.avatar_url || '/default-avatar.png'}
          alt="Avatar do usuário"
          radius="xl"
          style={{ cursor: 'pointer' }}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          Olá, {user.user_metadata?.user_name || user.user_metadata?.full_name || 'Usuário'}
        </Menu.Label>
        <Menu.Item component={Link} to="/dashboard">
          Dashboard
        </Menu.Item>
        <Menu.Item component={Link} to="/feedback">
          Enviar Feedback
        </Menu.Item>

        {userData?.is_admin && (
          <>
            <Menu.Divider />
            <Menu.Item component={Link} to="/admin" color="violet">
              Painel Admin
            </Menu.Item>
          </>
        )}

        <Menu.Divider />
        <Menu.Item color="red" onClick={handleSignOut}>
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button component={Link} to="/login" variant='gradient' gradient={{from: 'cyan', to: 'blue'}}>
        Acessar Painel
      </Button>
    </motion.div>
  );
  
  const mobileAuthControls = user ? (
    <>
      <Text size="sm" fw={500} ta="center" my="sm">
        Logado como {user.user_metadata?.user_name || user.user_metadata?.full_name}
      </Text>
      <Button component={Link} to="/dashboard" variant='light' fullWidth onClick={close}>
          Dashboard
      </Button>
      <Button component={Link} to="/feedback" variant='light' fullWidth mt="md" onClick={close}>
          Enviar Feedback
      </Button>
      {userData?.is_admin && (
         <Button component={Link} to="/admin" variant='light' color="violet" fullWidth mt="md" onClick={close}>
            Painel Admin
        </Button>
      )}
      <Button variant='filled' color="red" mt="md" fullWidth onClick={() => { handleSignOut(); close(); }}>
        Sair
      </Button>
    </>
  ) : (
    <Button component={Link} to="/login" variant='gradient' gradient={{from: 'cyan', to: 'blue'}} mt="md" onClick={close}>
      Acessar Painel
    </Button>
  );


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
          <Group>
            {/* ▼▼▼ BOTÃO "COMUNIDADE DISCORD" REMOVIDO DAQUI ▼▼▼ */}
            {authControls}
          </Group>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Drawer opened={opened} onClose={close} position="right" title="Navegação" hiddenFrom="sm">
          <div className={classes.drawerContent}>
            {items}
            <Divider my="sm" />
            {/* ▼▼▼ BOTÃO "COMUNIDADE DISCORD" REMOVIDO DA VERSÃO MOBILE TAMBÉM ▼▼▼ */}
            {mobileAuthControls}
          </div>
        </Drawer>
      </Container>
    </header>
  );
}
