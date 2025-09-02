// src/components/Marquee.tsx
import { Box, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function Marquee() {
  const [message, setMessage] = useState("Carregando mensagem...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca a mensagem mais recente no banco de dados
    const fetchMessage = async () => {
      const { data, error } = await supabase
        .from('marquee_messages')
        .select('message')
        .eq('is_active', true) // Busca apenas a mensagem ativa
        .order('created_at', { ascending: false }) // Pega a mais recente
        .limit(1)
        .single();

      if (data) {
        setMessage(data.message);
      } else {
        console.error('Erro ao buscar mensagem do letreiro:', error);
        setMessage("Erro ao carregar a mensagem.");
      }
      setLoading(false);
    };

    fetchMessage();

    // Ouve as mudanças no banco de dados em tempo real
    const channel = supabase
      .channel('marquee_messages_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'marquee_messages' }, fetchMessage)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'marquee_messages' }, fetchMessage)
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'marquee_messages' }, fetchMessage)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Box
      style={{
        width: '100%',
        backgroundColor: 'rgba(26, 27, 30, 0.8)',
        backdropFilter: 'blur(5px)',
        overflow: 'hidden',
        borderTop: '1px solid var(--mantine-color-gray-7)',
        borderBottom: '1px solid var(--mantine-color-gray-7)',
        padding: '10px 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
        style={{
          whiteSpace: 'nowrap',
          display: 'inline-block',
          fontSize: 'var(--mantine-font-size-md)',
          fontWeight: 600,
          color: 'var(--mantine-color-cyan-4)',
          paddingLeft: '100%',
        }}
      >
        <Text component="span" style={{ whiteSpace: 'nowrap', textShadow: '0 0 5px var(--mantine-color-cyan-4)' }}>
          {loading ? "Carregando..." : message}
          {'  —  '}
          {loading ? "Carregando..." : message}
        </Text>
      </motion.div>
    </Box>
  );
}