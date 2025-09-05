import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, SimpleGrid, Card, Badge, Skeleton, Group, Image } from '@mantine/core';
// A importação de ícones foi REMOVIDA

// ▼▼▼ ÍCONE SVG ADICIONADO DIRETAMENTE NO CÓDIGO ▼▼▼
const IconCalendar = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M4 11h16" />
        <path d="M11 15h1" />
        <path d="M12 15v3" />
    </svg>
);
// ---------------------------------------------------

interface NewsArticle {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url?: string;
}

export function NewsListPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('id, created_at, title, content, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (data) setNews(data);
      if (error) console.error("Erro ao buscar todas as novidades:", error.message);
      setLoading(false);
    };

    fetchAllNews();
  }, []);

  const skeletonCards = Array(3).fill(0).map((_, index) => (
    <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={180} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Skeleton height={20} width="70%" />
        <Skeleton height={16} width="20%" />
      </Group>
      <Skeleton height={10} count={3} />
      <Skeleton height={36} width="50%" mt="md" />
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">Todas as Novidades</Title>
      <Text ta="center" c="dimmed" mb="xl">Fique por dentro das últimas notícias e atualizações da JV Store!</Text>

      {loading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {skeletonCards}
        </SimpleGrid>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {news.map((article) => (
            <Card key={article.id} shadow="sm" padding="lg" radius="md" withBorder>
              {article.image_url && (
                <Card.Section>
                  <Image src={article.image_url} height={180} alt={article.title} />
                </Card.Section>
              )}
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} lineClamp={1}>{article.title}</Text>
                {/* O Badge agora usa o ícone local */}
                <Badge color="gray" leftSection={<IconCalendar style={{width: 14, height: 14}} />}>
                  {new Date(article.created_at).toLocaleDateString()}
                </Badge>
              </Group>
              <Text size="sm" c="dimmed" lineClamp={3}>
                {article.content}
              </Text>
            </Card>
          ))}
          {news.length === 0 && !loading && (
            <Text c="dimmed" ta="center" style={{ gridColumn: '1 / -1' }}>Nenhuma novidade publicada ainda.</Text>
          )}
        </SimpleGrid>
      )}
    </Container>
  );
}
