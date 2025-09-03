// src/pages/StatusManager.tsx
import { Title, Text, Paper, Select, TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';

export function StatusManager() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const form = useForm({
    initialValues: {
      status: 'operational',
      message: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setStatusMessage('');
    try {
      // Invoca a nossa Supabase Edge Function 'update-status'
      // Nota: Esta função precisa existir e estar deployada no Supabase
      const { data, error } = await supabase.functions.invoke('update-status', {
        body: { message: values.message, status: values.status },
      });

      if (error) throw error;

      setStatusMessage('Status atualizado com sucesso!');
    } catch (error: any) {
      setStatusMessage(`Erro: ${error.message || 'Falha ao contatar a API.'}`);
    }
    setLoading(false);
  };

  return (
    <Paper withBorder p="xl" radius="md">
      <Title order={3}>Controle da Barra de Status</Title>
      <Text size="sm" c="dimmed" mt="xs">
        Altere a mensagem e o status que aparecem no topo do site para todos os visitantes.
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Status dos Bots"
          data={[
            { value: 'operational', label: '✅ Operacional' },
            { value: 'degraded', label: '⚠️ Instabilidade' },
            { value: 'maintenance', label: '🛠️ Manutenção' },
          ]}
          {...form.getInputProps('status')}
          mt="md"
        />
        <TextInput
          label="Mensagem de Status"
          placeholder="Escreva a mensagem que aparecerá na barra"
          {...form.getInputProps('message')}
          mt="md"
        />
        <Group justify="flex-end" mt="xl">
          {statusMessage && (
              <Text size="sm" c={statusMessage.startsWith('Erro') ? 'red' : 'green'}>
                  {statusMessage}
              </Text>
          )}
          <Button type="submit" loading={loading}>
            Atualizar Status
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
