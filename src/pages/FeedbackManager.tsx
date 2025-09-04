import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Table, Button, Group, Text, Avatar, Alert, LoadingOverlay, Badge, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './FeedbackManager.module.css';

// --- ÍCONES SVG EMBUTIDOS ---
const IconAlertCircle = (props: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
);
const IconTrash = (props: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
);
const IconEye = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
);
const IconEyeOff = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674" /><path d="M9.86 5.86c1.36 .36 2.62 .95 3.81 1.82c2.4 1.76 4.33 4.33 6.33 8.32" /><path d="M3 3l18 18" /></svg>
);
// --------------------------------

interface Feedback {
  id: string; created_at: string; user_display_name: string; user_avatar_url: string; rating: number; comment: string; is_visible: boolean;
}

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase.from('feedbacks').select('*').order('created_at', { ascending: false });
    if (fetchError) { setError('Erro ao carregar os feedbacks.'); console.error(fetchError); } else { setFeedbacks(data as Feedback[]); }
    setLoading(false);
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const handleVisibilityToggle = async (feedback: Feedback) => {
    setLoading(true);
    const { error: updateError } = await supabase.from('feedbacks').update({ is_visible: !feedback.is_visible }).eq('id', feedback.id);
    if (updateError) {
      setError('Erro ao atualizar o feedback.');
      setLoading(false);
    } else {
      await fetchFeedbacks(); // Busca a lista atualizada do banco
    }
  };

  const handleDelete = async () => {
    if (!selectedFeedback) return;
    setLoading(true);
    const { error: deleteError } = await supabase.from('feedbacks').delete().eq('id', selectedFeedback.id);
    if (deleteError) {
      setError('Erro ao apagar o feedback.');
      setLoading(false);
    } else {
      close();
      await fetchFeedbacks(); // Busca a lista atualizada do banco
    }
  };

  const openDeleteModal = (feedback: Feedback) => { setSelectedFeedback(feedback); open(); };

  const rows = feedbacks.map((fb) => (
    <Table.Tr key={fb.id}>
      <Table.Td><Group gap="sm"><Avatar size={40} src={fb.user_avatar_url} radius={40} /><div><Text fz="sm" fw={500}>{fb.user_display_name}</Text><Text fz="xs" c="dimmed">{new Date(fb.created_at).toLocaleDateString()}</Text></div></Group></Table.Td>
      <Table.Td>{'⭐'.repeat(fb.rating)}</Table.Td>
      <Table.Td><div className={classes.commentCell}>{fb.comment}</div></Table.Td>
      <Table.Td><Badge color={fb.is_visible ? 'teal' : 'gray'} variant="light">{fb.is_visible ? 'Visível' : 'Oculto'}</Badge></Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button size="xs" variant="outline" onClick={() => handleVisibilityToggle(fb)} leftSection={fb.is_visible ? <IconEyeOff style={{width: 14, height: 14}} /> : <IconEye style={{width: 14, height: 14}} />}>{fb.is_visible ? 'Ocultar' : 'Aprovar'}</Button>
          <Button size="xs" variant="outline" color="red" onClick={() => openDeleteModal(fb)} leftSection={<IconTrash style={{width: 14, height: 14}} />}>Apagar</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Text fz="xl" fw={700} mb="lg">Gerenciador de Feedbacks</Text>
      {error && <Alert title="Erro" color="red" icon={<IconAlertCircle />}>{error}</Alert>}
      <Modal opened={opened} onClose={close} title="Confirmar Exclusão" centered>
        <Text>Tem certeza que deseja apagar este feedback permanentemente?</Text>
        <Text c="dimmed" size="sm">"{selectedFeedback?.comment}"</Text>
        <Group justify="flex-end" mt="md"><Button variant="default" onClick={close}>Cancelar</Button><Button color="red" onClick={handleDelete}>Apagar</Button></Group>
      </Modal>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead><Table.Tr><Table.Th>Usuário</Table.Th><Table.Th>Nota</Table.Th><Table.Th>Comentário</Table.Th><Table.Th>Status</Table.Th><Table.Th>Ações</Table.Th></Table.Tr></Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {feedbacks.length === 0 && !loading && <Text ta="center" mt="lg">Nenhum feedback encontrado.</Text>}
    </div>
  );
};

export default FeedbackManager;
