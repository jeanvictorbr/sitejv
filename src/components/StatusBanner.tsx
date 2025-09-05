import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Paper, Text, CloseButton, Center } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './StatusBanner.module.css';

interface Status {
  status_text: string;
  color: string;
}

export function StatusBanner() {
  const [status, setStatus] = useState<Status | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Busca o status inicial ao carregar a página
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('site_status')
        .select('status_text, color')
        .eq('id', 1)
        .single();
      if (data) {
        setStatus(data);
        setVisible(true); // Garante que a barra seja visível se houver status
      }
    };

    fetchStatus();

    // 2. ▼▼▼ CORREÇÃO: Escuta por mudanças em tempo real na tabela site_status ▼▼▼
    const channel = supabase
      .channel('realtime-status-banner')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'site_status', filter: 'id=eq.1' },
        (payload) => {
          // Quando uma atualização acontece, atualiza o estado local com os novos dados
          const newStatus = payload.new as Status;
          setStatus(newStatus);
          setVisible(true); // Mostra a barra novamente se um novo status for salvo
        }
      )
      .subscribe();

    // 3. Limpa a "escuta" quando o componente é desmontado
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!status || !status.status_text || !visible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
        <Paper className={classes.banner} style={{ backgroundColor: `var(--mantine-color-${status.color}-9)` }}>
          <Center>
            <Text className={classes.text}>{status.status_text}</Text>
          </Center>
          <CloseButton onClick={() => setVisible(false)} className={classes.closeButton} />
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
