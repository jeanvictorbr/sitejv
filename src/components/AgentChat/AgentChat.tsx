import { useState, useRef, useEffect } from 'react';
import { Portal, ActionIcon, Paper, Text, TextInput, ScrollArea, Group, Avatar, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import classes from './AgentChat.module.css';

// --- Ícones SVG ---
const IconSparkles = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9Z" /></svg>
);
const IconSend = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1-1 0l-3.5-7l-7-3.5a.55 .55 0 0 1 0-1l18-6.5" /></svg>
);
// ------------------

interface Message {
  type: 'user' | 'agent';
  text: string;
}

export function AgentChat() {
  const [opened, { toggle }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'agent', text: 'Olá! Sou o Agente JV. Como posso ajudar você hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    if (opened) {
      scrollToBottom();
    }
  }, [messages, opened]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setTimeout(() => { setLoading(true); scrollToBottom(); }, 100);

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
    <Portal>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={classes.chatWindow}
          >
            <Paper withBorder radius="lg" shadow="xl" className={classes.paper}>
              <div className={classes.header}>
                <Group>
                  <Avatar color="cyan" radius="xl"><IconSparkles /></Avatar>
                  <div>
                    <Text fw={700}>Agente JV</Text>
                    <Text size="xs" c="dimmed">Online</Text>
                  </div>
                </Group>
              </div>
              <ScrollArea.Autosize mah="100%" viewportRef={viewport} className={classes.messageArea}>
                <div style={{ padding: 'var(--mantine-spacing-md)'}}>
                    {messages.map((msg, index) => (
                      <div key={index} className={classes.messageWrapper} data-type={msg.type}>
                        <div className={classes.messageBubble}>
                          <Text size="sm" component="div" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                        </div>
                      </div>
                    ))}
                    {loading && (
                        <div className={classes.messageWrapper} data-type="agent">
                            <div className={classes.messageBubble}> <Loader size="sm" /> </div>
                        </div>
                    )}
                </div>
              </ScrollArea.Autosize>
              <div className={classes.inputArea}>
                <TextInput
                  placeholder="Digite sua dúvida..."
                  value={inputValue}
                  onChange={(event) => setInputValue(event.currentTarget.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter' && !loading) { handleSendMessage(); } }}
                  rightSection={ <ActionIcon onClick={handleSendMessage} loading={loading} variant="subtle"> <IconSend /> </ActionIcon> }
                />
              </div>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <ActionIcon
          onClick={toggle}
          size="xl"
          radius="xl"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'blue' }}
          className={classes.orbButton}
        >
          <IconSparkles />
        </ActionIcon>
      </motion.div>
    </Portal>
  );
}