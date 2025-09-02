// src/pages/MarqueeManager.tsx

import { 
  Paper, 
  Title, 
  Text, 
  TextInput, 
  Button, 
  Group, 
  Switch, 
  Table, 
  ActionIcon, 
  Container  // <<< CORREÇÃO DEFINITIVA AQUI
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MarqueeMessage {
  id: string;
  message: string;
  is_active: boolean;
  created_at: string;
}

export function MarqueeManager() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MarqueeMessage[]>([]);
  const [submitStatus, setSubmitStatus] = useState('');

  const form = useForm({
    initialValues: {
      message: '',
      is_active: true,
    },
    validate: {
      message: (value) => (value.trim().length === 0 ? 'A mensagem não pode ser vazia.' : null),
    },
  });

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('marquee_messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    if (error) console.error('Erro ao buscar mensagens:', error);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleInsertMessage = async (values: typeof form.values) => {
    setLoading(true);
    const { error } = await supabase.from('marquee_messages').insert({ message: values.message, is_active: values.is_active });
    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      form.reset();
      await fetchMessages();
    }
    setLoading(false);
  };
  
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('marquee_messages').update({ is_active: !currentStatus }).eq('id', id);
    if (error) {
      console.error('Erro ao atualizar status:', error);
    } else {
      await fetchMessages();
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from('marquee_messages').delete().eq('id', id);
    if (error) {
      console.error('Erro ao deletar mensagem:', error);
    } else {
      await fetchMessages();
    }
  };

  const rows = messages.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.message}</Table.Td>
      <Table.Td>
        <Group>
          <Switch
            checked={element.is_active}
            onChange={() => handleToggleActive(element.id, element.is_active)}
            onLabel={<Text>✅</Text>}
            offLabel={<Text>❌</Text>}
            size="md"
          />
        </Group>
      </Table.Td>
      <Table.Td>
        <ActionIcon color="red" variant="subtle" onClick={() => handleDeleteMessage(element.id)}>
          <Text>🗑️</Text>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container py="xl" size="xl">
      <Title order={1}>Gerenciamento do Letreiro</Title>
      <Text c="dimmed">Adicione, edite e ative/desative as mensagens que aparecem na página inicial.</Text>

      <Paper withBorder p="xl" mt="xl" radius="md">
        <Title order={3}>Adicionar Nova Mensagem</Title>
        <form onSubmit={form.onSubmit(handleInsertMessage)}>
          <TextInput
            label="Mensagem do Letreiro"
            placeholder="Escreva a mensagem que será exibida..."
            {...form.getInputProps('message')}
            mt="md"
          />
          <Group justify="space-between" mt="md" grow>
            <Switch
              label="Deixar mensagem ativa"
              description="A mensagem aparecerá no letreiro."
              {...form.getInputProps('is_active', { type: 'checkbox' })}
            />
            <Button type="submit" loading={loading}>
              Adicionar Mensagem
            </Button>
          </Group>
        </form>
      </Paper>

      <Paper withBorder p="xl" mt="xl" radius="md">
        <Title order={3}>Mensagens Existentes</Title>
        {messages.length > 0 ? (
          <Table mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Mensagem</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Ações</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        ) : (
          <Text c="dimmed" ta="center" mt="md">Nenhuma mensagem adicionada ainda.</Text>
        )}
      </Paper>
    </Container>
  );
}