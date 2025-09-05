// src/pages/NewsManager.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Title, Text, Button, Modal, TextInput, Textarea, Switch, Table, ActionIcon, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

interface NewsArticle {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url?: string;
  is_published: boolean;
}

export function NewsManager() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);

  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      image_url: '',
      is_published: false,
    },
    validate: {
      title: (value) => (value.trim().length < 5 ? 'O título é muito curto.' : null),
      content: (value) => (value.trim().length < 10 ? 'O conteúdo é muito curto.' : null),
    },
  });

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (data) setNews(data);
    if (error) console.error("Erro ao buscar novidades:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (article: NewsArticle) => {
    setEditing(article);
    form.setValues(article);
    open();
  };

  const handleNew = () => {
    setEditing(null);
    form.reset();
    open();
  };

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const { error } = editing
      ? await supabase.from('news').update(values).eq('id', editing.id)
      : await supabase.from('news').insert(values);

    if (error) {
      console.error("Erro ao salvar novidade:", error);
    } else {
      await fetchNews();
      close();
    }
    setLoading(false);
  };
  
  const handleDelete = async (id: string) => {
      await supabase.from('news').delete().eq('id', id);
      await fetchNews();
  }

  const rows = news.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{item.is_published ? '✅ Publicado' : '❌ Rascunho'}</Table.Td>
      <Table.Td>{new Date(item.created_at).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button size="xs" variant="outline" onClick={() => handleEdit(item)}>Editar</Button>
          <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(item.id)}>
            <Text>🗑️</Text>
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} title={editing ? 'Editar Novidade' : 'Adicionar Novidade'} size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput withAsterisk label="Título" placeholder="Título da novidade" {...form.getInputProps('title')} />
          <Textarea mt="md" withAsterisk label="Conteúdo" placeholder="Descreva a novidade..." minRows={5} {...form.getInputProps('content')} />
          <TextInput mt="md" label="URL da Imagem (Opcional)" placeholder="https://exemplo.com/imagem.png" {...form.getInputProps('image_url')} />
          <Switch mt="md" label="Publicar novidade" {...form.getInputProps('is_published', { type: 'checkbox' })} />
          <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={close}>Cancelar</Button>
            <Button type="submit" loading={loading}>Salvar</Button>
          </Group>
        </form>
      </Modal>

      <Paper withBorder p="xl" radius="md">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Gerenciar Novidades</Title>
            <Text c="dimmed">Crie e publique notícias e atualizações para a página inicial.</Text>
          </div>
          <Button onClick={handleNew}>Adicionar Novidade</Button>
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Título</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Data</Table.Th>
              <Table.Th>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </>
  );
}
