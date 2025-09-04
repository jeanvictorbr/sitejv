import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Text, Group, Paper } from '@mantine/core';
import { motion } from 'framer-motion';

// Ícone SVG de "olho" embutido, seguindo nosso novo padrão
const IconEye = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
);

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const COUNTER_ID = 'homepage';

  useEffect(() => {
    const fetchAndUpdateCount = async () => {
      try {
        // 1. Busca o valor atual do contador
        let { data, error } = await supabase
          .from('counters')
          .select('value')
          .eq('id', COUNTER_ID)
          .single();

        if (error) throw error;
        
        const currentCount = data.value;
        setCount(currentCount);

        // 2. Incrementa o valor no banco de dados para o próximo visitante
        // Não esperamos essa promessa resolver para mostrar o contador mais rápido
        supabase
          .from('counters')
          .update({ value: currentCount + 1 })
          .eq('id', COUNTER_ID)
          .then(({ error: updateError }) => {
            if (updateError) {
              console.error("Erro ao incrementar contador:", updateError);
            }
          });

      } catch (error) {
        console.error("Erro ao buscar o contador:", error);
      }
    };

    fetchAndUpdateCount();
  }, [COUNTER_ID]);

  if (count === null) {
    return null; // Não mostra nada enquanto carrega para não piscar na tela
  }

  // Usamos motion.div para a animação e Paper para o estilo
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper withBorder p="xs" radius="md" style={{ display: 'inline-block', margin: 'auto', backgroundColor: 'transparent' }}>
        <Group gap="xs">
          <IconEye style={{width: 18, height: 18}} />
          <Text size="sm" c="dimmed">
            {count.toLocaleString('pt-BR')} visualizações no site
          </Text>
        </Group>
      </Paper>
    </motion.div>
  );
};