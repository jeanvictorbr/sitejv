// src/components/VisitorCounter.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Text, Group, Paper } from '@mantine/core';
import { Eye } from 'tabler-icons-react';
import { motion } from 'framer-motion';

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const COUNTER_ID = 'homepage';

  useEffect(() => {
    const fetchAndUpdateCount = async () => {
      let { data, error } = await supabase
        .from('counters')
        .select('value')
        .eq('id', COUNTER_ID)
        .single();

      if (error) {
        console.error("Erro ao buscar o contador:", error);
        return;
      }

      const currentCount = data.value;
      setCount(currentCount);

      await supabase
        .from('counters')
        .update({ value: currentCount + 1 })
        .eq('id', COUNTER_ID);
    };

    fetchAndUpdateCount();
  }, []);

  if (count === null) {
    return null; // Não mostra nada enquanto carrega
  }

  // Usamos motion.div para a animação e Paper para o estilo
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper withBorder p="xs" radius="md" style={{ display: 'inline-block', margin: 'auto' }}>
        <Group gap="xs">
          <Eye size={18} />
          <Text size="sm" c="dimmed">
            {count.toLocaleString('pt-BR')} visualizações
          </Text>
        </Group>
      </Paper>
    </motion.div>
  );
};
