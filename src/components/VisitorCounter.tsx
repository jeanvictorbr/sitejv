// src/components/VisitorCounter.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Confirme que o caminho para o seu cliente supabase está correto.
import { Text, Group } from '@mantine/core';
import { Users } from 'tabler-icons-react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        // 1. Chamamos a função 'increment_page_visit' que criámos no Supabase.
        //    Isto incrementa o contador e retorna o novo valor.
        const { data, error } = await supabase.rpc('increment_page_visit', {
          page_name_text: 'homepage' // Usamos 'homepage' para identificar esta página.
        });

        if (error) {
          throw error; // Se houver um erro, passamos para o bloco catch.
        }

        if (data) {
          setVisitCount(data); // Atualizamos o estado com o novo número de visitas.
        }
      } catch (error) {
        console.error('Erro ao atualizar o contador de visitas:', error);
        
        // 2. Plano B: Se a função de incremento falhar, apenas tentamos ler o valor atual.
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
  }, []); // O array vazio [] garante que este código só é executado uma vez, quando o componente é montado.

  return (
    // 3. Usamos framer-motion para uma animação subtil de fade-in.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Group justify="center" mt="md" gap="xs">
        <Users size={18} />
        <Text size="sm" c="dimmed">
          {visitCount !== null ? `${visitCount} visitantes já passaram por aqui!` : 'A carregar...'}
        </-Text>
      </Group>
    </motion.div>
  );
};

export default VisitorCounter;