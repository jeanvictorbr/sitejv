import { useState } from 'react';
import { Container, Group, Burger, Menu, Avatar, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';

// --- Ícones SVG embutidos (padrão do projeto) ---
const IconChevronDown = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6" /></svg> );
const IconLogout = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" /><path d="M9 12h12l-3-3" /><path d="m21 15-3-3" /></svg> );
const IconSettings = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" /></svg> );
const IconStar = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> );
const IconDashboard = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg> );
// --------------------------------

// ▼▼▼ AGORA O LINK FOI REMOVIDO DA LISTA DE VEZ ▼▼▼
const links = [
  { link: '/pricing', label: 'Preços' },
  { link: '/feedbacks', label: 'Feedbacks' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const { user, signOut } = useAuth();
  const { userData } = useUserData();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Link to="/" className={classes.logoLink}>
          <Text component="span" className={classes.logoText}><span className={classes.logoAccent}>JV</span> Store</Text>
        </Link>
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        
        <Group visibleFrom="sm">
            {user ? (
                 <Menu
                    width={260}
                    position="bottom-end"
                    transitionProps={{ transition: 'pop-top-right' }}
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    withinPortal
                >
                    <Menu.Target>
                        <Button variant="subtle" className={classes.user} >
                            <Group gap="xs">
                                <Avatar src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name} radius="xl" size="sm" />
                                <Text fw={500} size="sm" style={{ lineHeight: 1, color: 'var(--mantine-color-white)' }}>
                                    {user.user_metadata?.name || user.email}
                                </Text>
                                <IconChevronDown style={{ width: '0.9rem', height: '0.9rem', color: 'var(--mantine-color-gray-5)'}}/>
                            </Group>
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {userData?.is_admin && (
                             <Menu.Item
                                leftSection={<IconDashboard style={{ width: '1rem', height: '1rem' }} />}
                                onClick={() => navigate('/admin')}
                            >
                                Painel Admin
                            </Menu.Item>
                        )}
                        <Menu.Item
                            leftSection={<IconSettings style={{ width: '1rem', height: '1rem' }} />}
                            onClick={() => navigate('/dashboard')}
                        >
                            Minha Conta
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconStar style={{ width: '1rem', height: '1rem' }} />}
                            onClick={() => navigate('/feedback')}
                        >
                            Deixar Feedback
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            leftSection={<IconLogout style={{ width: '1rem', height: '1rem' }} />}
                            onClick={handleSignOut}
                        >
                            Sair da Conta
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            ) : (
                <Button onClick={() => navigate('/login')} variant="default">Entrar</Button>
            )}
        </Group>

        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </Container>
    </header>
  );
}
