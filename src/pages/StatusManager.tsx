import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Title, Text, Button, Modal, TextInput, Textarea, Select, Table, ActionIcon, Group, Paper, Badge, Divider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

// --- Ícones ---
const IconEdit = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3z" /></svg> );
const IconTrash = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12" /><path d="M9 7v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /></svg> );
// ------------

interface BotStatus {
  id: string;
  name: string;
  status: 'Operacional' | 'Instável' | 'Manutenção';
  description?: string;
}

export function StatusManager() {
  const [botStatuses, setBotStatuses] = useState<BotStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<BotStatus | null>(null);

  const [topBannerStatus, setTopBannerStatus] = useState({ text: '', color: 'blue' });
  const topBannerForm = useForm({ initialValues: { text: '', color: 'blue' } });

  const form = useForm({
    initialValues: { name: '', status: 'Operacional', description: '' },
    validate: { name: (value) => (value.trim().length < 3 ? 'O nome do bot é muito curto.' : null) },
  });

  const fetchStatuses = async () => {
    setLoading(true);
    // Busca status individuais
    const { data: botsData } = await supabase.from('bot_status').select('*').order('name');
    if (botsData) setBotStatuses(botsData as BotStatus[]);

    // Busca status do topo
    const { data: bannerData } = await supabase.from('site_status').select('*').eq('id', 1).single();
    if (bannerData) {
        setTopBannerStatus({ text: bannerData.status_text, color: bannerData.color });
        topBannerForm.setValues({ text: bannerData.status_text, color: bannerData.color });
    }
    setLoading(false);
  };

  useEffect(() => { fetchStatuses(); }, []);

  const handleEdit = (bot: BotStatus) => { setEditing(bot); form.setValues(bot); open(); };
  const handleNew = () => { setEditing(null); form.reset(); open(); };

  const handleBotSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const { error } = editing
      ? await supabase.from('bot_status').update(values).eq('id', editing.id)
      : await supabase.from('bot_status').insert(values);
    if (!error) { await fetchStatuses(); close(); }
    setLoading(false);
  };
  
  const handleBotDelete = async (id: string) => {
    if (window.confirm('Tem certeza?')) {
        await supabase.from('bot_status').delete().eq('id', id);
        await fetchStatuses();
    }
  }
  
  const handleTopBannerSubmit = async (values: typeof topBannerForm.values) => {
    await supabase.from('site_status').update({ status_text: values.text, color: values.color }).eq('id', 1);
    await fetchStatuses();
    alert('Status do topo atualizado!');
  }
  
  const statusColors = { Operacional: 'teal', Instável: 'orange', Manutenção: 'red' };

  const rows = botStatuses.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>
        <Badge color={statusColors[item.status]} variant="light">{item.status}</Badge>
      </Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" onClick={() => handleEdit(item)}><IconEdit size={16} /></ActionIcon>
          <ActionIcon color="red" variant="subtle" onClick={() => handleBotDelete(item.id)}><IconTrash size={16} /></ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title={editing ? 'Editar Status do Bot' : 'Adicionar Bot'} centered>
        <form onSubmit={form.onSubmit(handleBotSubmit)}>
          <TextInput withAsterisk label="Nome do Bot" {...form.getInputProps('name')} />
          <Select mt="md" withAsterisk label="Status" data={['Operacional', 'Instável', 'Manutenção']} {...form.getInputProps('status')} />
          <Textarea mt="md" label="Descrição (Opcional)" {...form.getInputProps('description')} />
          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={close}>Cancelar</Button>
            <Button type="submit" loading={loading}>Salvar</Button>
          </Group>
        </form>
      </Modal>

      <Paper withBorder p="xl" radius="md">
        <Title order={2}>Gerenciar Status Geral (Topo)</Title>
        <Text c="dimmed">Esta é a mensagem que aparece na barra no topo de todas as páginas.</Text>
        <form onSubmit={topBannerForm.onSubmit(handleTopBannerSubmit)}>
            <Group grow align="flex-end" mt="md">
                <TextInput label="Texto da Barra" {...topBannerForm.getInputProps('text')} />
                <Select label="Cor" data={['blue', 'cyan', 'teal', 'green', 'orange', 'red']} {...topBannerForm.getInputProps('color')} />
                <Button type="submit">Salvar Status Geral</Button>
            </Group>
        </form>
        
        <Divider my="xl" label="Status dos Bots Individuais" labelPosition="center" />

        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Gerenciar Status dos Bots</Title>
            <Text c="dimmed">Esta lista aparecerá na coluna lateral da página inicial.</Text>
          </div>
          <Button onClick={handleNew}>Adicionar Bot</Button>
        </Group>

        <Table.ScrollContainer minWidth={500}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nome do Bot</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Descrição</Table.Th>
                        <Table.Th>Ações</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
      </Paper>
    </>
  );
}
