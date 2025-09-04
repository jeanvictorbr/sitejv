import { useState, useRef, useEffect } from 'react';
import { Paper, Text, TextInput, ScrollArea, Group, ThemeIcon, Loader, CloseButton, ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { MatrixBackground } from '../components/MatrixBackground';
import { useTextScramble } from '../hooks/useTextScramble';
import classes from './ChatPage.module.css';
import { Link } from 'react-router-dom';

// --- Ícones SVG ---
const IconSparkles = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z" /></svg> );
const IconSend = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1-1 0l-3.5-7l-7-3.5a.55 .55 0 0 1 0-1l18-6.5" /></svg> );
// ------------------

interface Message {
  type: 'user' | 'agent';
  text: string;
}

export function ChatPage() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'agent', text: 'Olá! Sou o Agente JV. Fique à vontade para tirar todas as suas dúvidas sobre nossos produtos e serviços.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const viewport = useRef<HTMLDivElement>(null);
  const animatedTitle = useTextScramble('Agente JV - Atendimento Virtual');

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Rola para baixo sempre que uma nova mensagem é adicionada
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || loading) return;
    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ask-agent', {
        body: { query: userMessage },
      });
      if (error) throw error;
      setMessages(prev => [...prev, { type: 'agent', text: data.response }]);
    } catch (err) {
      console.error("Erro ao chamar a função 'ask-agent':", err);
      setMessages(prev => [...prev, { type: 'agent', text: 'Desculpe, estou com um pequeno problema para me conectar. Tente novamente em alguns instantes.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.chatPage}>
      <MatrixBackground />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={classes.container}
      >
        <Paper withBorder radius="lg" shadow="xl" className={classes.paper}>
          <div className={classes.header}>
            <Group>
              <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'lime', to: 'green' }} radius="xl"><IconSparkles /></ThemeIcon>
              <div>
                <Text fw={700} dangerouslySetInnerHTML={{ __html: animatedTitle }} />
                <Text size="xs" c="dimmed">Online</Text>
              </div>
            </Group>
            <CloseButton component={Link} to="/" aria-label="Voltar para a página inicial" />
          </div>
          
          <ScrollArea viewportRef={viewport} className={classes.messageArea}>
            {messages.map((msg, index) => (
              <div key={index} className={classes.messageWrapper}>
                <div className={classes.messageBubble} data-type={msg.type}>
                  <Text size="sm">{msg.text}</Text>
                </div>
              </div>
            ))}
            {loading && (
              <div className={classes.messageWrapper} data-type="agent">
                <div className={classes.messageBubble}><Loader color="green" size="sm" /></div>
              </div>
            )}
          </ScrollArea>
          
          <div className={classes.inputArea}>
            <TextInput
              placeholder="Digite sua dúvida..."
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              onKeyDown={(event) => { if (event.key === 'Enter' && !loading) { handleSendMessage(); } }}
              rightSection={
                <ActionIcon onClick={handleSendMessage} loading={loading} variant="subtle" color="green">
                  <IconSend />
                </ActionIcon>
              }
            />
          </div>
        </Paper>
      </motion.div>
    </div>
  );
}
