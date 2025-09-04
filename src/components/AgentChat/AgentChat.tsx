import { useState, useRef, useEffect } from 'react';
// ▼▼▼ Importe o ThemeIcon aqui ▼▼▼
import { ActionIcon, Paper, Text, TextInput, ScrollArea, Group, ThemeIcon, Loader, CloseButton } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import classes from './AgentChat.module.css';

// --- Ícones SVG ---
const IconSparkles = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z" /></svg> );
const IconSend = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1-1 0l-3.5-7l-7-3.5a.55 .55 0 0 1 0-1l18-6.5" /></svg> );
// ------------------

interface Message {
  type: 'user' | 'agent';
  text: string;
}

interface AgentChatProps {
  opened: boolean;
  onClose: () => void;
}

export function AgentChat({ opened, onClose }: AgentChatProps) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'agent', text: 'Olá! Sou o Agente JV. Como posso ajudar com os bots FactionFlow ou TicketUltra?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewport.current) {
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (opened) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, opened]);

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
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={classes.chatWindow}
        >
          <Paper withBorder radius="lg" shadow="xl" className={classes.paper}>
            <div className={classes.header}>
              <Group>
                {/* ▼▼▼ TROCADO Avatar por ThemeIcon para corrigir o erro de SVG ▼▼▼ */}
                <ThemeIcon size="lg" color="cyan" radius="xl"><IconSparkles /></ThemeIcon>
                <div>
                  <Text fw={700}>Agente JV</Text>
                  <Text size="xs" c="dimmed">Online</Text>
                </div>
              </Group>
              <CloseButton onClick={onClose} aria-label="Fechar chat" />
            </div>
            
            <ScrollArea viewportRef={viewport} className={classes.messageArea}>
              {messages.map((msg, index) => (
                <div key={index} className={classes.messageWrapper} data-type={msg.type}>
                  <div className={classes.messageBubble}>
                    <Text size="sm">{msg.text}</Text>
                  </div>
                </div>
              ))}
              {loading && (
                <div className={classes.messageWrapper} data-type="agent">
                  <div className={classes.messageBubble}><Loader size="sm" /></div>
                </div>
              )}
            </ScrollArea>
            
            <div className={classes.inputArea}>
              <TextInput
                placeholder="Digite sua dúvida..."
                value={inputValue}
                onChange={(event) => setInputValue(event.currentTarget.value)}
                onKeyDown={(event) => { if (event.key === 'Enter' && !loading) { handleSendMessage(); } }}
                rightSection={<ActionIcon onClick={handleSendMessage} loading={loading} variant="subtle"><IconSend /></ActionIcon>}
              />
            </div>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}