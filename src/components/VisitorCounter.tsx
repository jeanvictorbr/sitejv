// src/components/VisitorCounter.tsx (VERSÃO DE DEPURAÇÃO)
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Text, Group, Paper } from '@mantine/core'; // Adicionamos o Paper para o fundo
import { Users } from 'tabler-icons-react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [debugMessage, setDebugMessage] = useState('A iniciar...');

  useEffect(() => {
    console.log('[DEBUG] Componente VisitorCounter montado.');
    setDebugMessage('A tentar chamar a função do Supabase...');

    const fetchAndIncrement = async () => {
      try {
        const { data, error } = await supabase.rpc('increment_page_visit', {
          page_name_text: 'homepage'
        });

        console.log('[DEBUG] Resposta do Supabase RPC:', { data, error });

        if (error) {
          setDebugMessage(`Erro do Supabase: ${error.message}`);
          throw error;
        }

        if (data) {
          setDebugMessage('Sucesso! Contador atualizado.');
          setVisitCount(data);
        } else {
          setDebugMessage('A função executou mas não retornou dados.');
        }
      } catch (error) {
        console.error('Erro detalhado ao chamar a função:', error);
        // Não faremos o plano B por agora para manter o teste simples.
      }
    };

    fetchAndIncrement();
  }, []);

  // Adicionamos um <Paper> com um fundo para garantir que o componente está visível
  return (
    <Paper withBorder shadow="md" p="xs" m="md" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Group justify="center" gap="xs">
          <Users size={18} />
          <Text size="sm" c="dimmed">
            {visitCount !== null ? `${visitCount} visitantes já passaram por aqui!` : 'A carregar...'}
          </Text>
        </Group>
        <Text size="xs" c="red" ta="center" mt={5}>
          Debug: {debugMessage}
        </Text>
      </motion.div>
    </Paper>
  );
};

export default VisitorCounter;
