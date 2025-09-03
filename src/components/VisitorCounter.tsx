// src/components/VisitorCounter.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Text, Group, Loader } from '@mantine/core';
import { Eye } from 'tabler-icons-react'; // Usaremos um ícone diferente

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const COUNTER_ID = 'homepage';

  useEffect(() => {
    const fetchAndUpdateCount = async () => {
      // 1. Primeiro, vamos buscar o valor atual do contador na base de dados.
      let { data, error } = await supabase
        .from('counters')
        .select('value')
        .eq('id', COUNTER_ID)
        .single();

      if (error) {
        console.error("Erro ao buscar o contador:", error);
        // Mesmo que haja um erro, não quebramos a página.
        // O contador simplesmente não aparecerá.
        return;
      }

      // 2. Mostramos o valor atual na tela imediatamente.
      const currentCount = data.value;
      setCount(currentCount);

      // 3. Depois, incrementamos o valor na base de dados para o próximo visitante.
      const { error: updateError } = await supabase
        .from('counters')
        .update({ value: currentCount + 1 })
        .eq('id', COUNTER_ID);

      if (updateError) {
        console.error("Erro ao atualizar o contador:", updateError);
      }
    };

    fetchAndUpdateCount();
  }, []); // O array vazio garante que isto só executa uma vez.

  // Se o contador ainda não foi carregado, não mostramos nada
  // para não poluir a interface.
  if (count === null) {
    return null;
  }

  // Quando o contador estiver pronto, mostramos o valor.
  return (
    <Group justify="center" gap="xs">
      <Eye size={16} />
      <Text size="xs" c="dimmed">
        {count.toLocaleString('pt-BR')} visualizações
      </Text>
    </Group>
  );
};
