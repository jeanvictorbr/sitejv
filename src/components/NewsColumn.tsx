import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Title, Text, Paper, Button, Skeleton, Stack, Image, Card, AspectRatio } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './NewsColumn.module.css';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  image_url?: string;
}

export function NewsColumn() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('news')
        .select('id, title, content, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3); // Busca as 3 últimas novidades
      
      setNews(data || []);
      setLoading(false);
    };
    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <Paper withBorder p="md" radius="md" className={classes.columnPaper}>
        <Stack>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" radius="md" className={classes.columnPaper}>
      <Title order={4} className={classes.columnTitle}>Últimas Novidades</Title>
      <Stack gap="lg" mt="md">
        {news.map(article => (
          <Card key={article.id} p={0} radius="md" withBorder className={classes.newsCard}>
            {article.image_url && (
              <Card.Section>
                <AspectRatio ratio={16 / 9}>
                  <Image src={article.image_url} alt={article.title} className={classes.image} />
                </AspectRatio>
              </Card.Section>
            )}
            <div className={classes.cardContent}>
              <Text fw={600} lineClamp={2}>{article.title}</Text>
              <Text size="sm" c="dimmed" lineClamp={3} mt={5}>{article.content}</Text>
              <Button component={Link} to={`/news/${article.id}`} size="xs" variant="outline" mt="sm" fullWidth>
                Ver Mais
              </Button>
            </div>
          </Card>
        ))}
        <Button component={Link} to="/news" variant="light" fullWidth>
          Ver todas as novidades
        </Button>
      </Stack>
    </Paper>
  );
}
