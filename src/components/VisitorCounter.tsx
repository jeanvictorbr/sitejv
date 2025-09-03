// src/components/VisitorCounter.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Text, Group } from '@mantine/core';
import { Users } from 'tabler-icons-react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const { data, error } = await supabase.rpc('increment_page_visit', {
          page_name_text: 'homepage'
        });

        if (error) {
          throw error;
        }

        if (data) {
          setVisitCount(data);
        }
      } catch (error) {
        console.error('Erro ao atualizar o contador de visitas:', error);
        
        const { data: currentData } = await supabase
          .from('page_visits')
          .select('visit_count')
          .eq('page_name', 'homepage')
          .single();
        
        if (currentData) {
          setVisitCount(currentData.visit_count);
        }
      }
    };

    fetchAndIncrement();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Group justify="center" mt="md" gap="xs">
        <Users size={18} />
        <Text size="sm" c="dimmed">
          {visitCount !== null ? `${visitCount} visitantes já passaram por aqui!` : 'A carregar...'}
        </Text> {/* <-- CORRIGIDO AQUI */}
      </Group>
    </motion.div>
  );
};

export default VisitorCounter;