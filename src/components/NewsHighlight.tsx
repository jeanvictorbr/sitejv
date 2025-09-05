import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, Button, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './NewsHighlight.module.css'; // Importa o CSS

interface NewsArticle {
  title: string;
  content: string;
  image_url?: string;
}

export function NewsHighlight() {
  const [latestNews, setLatestNews] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('news')
        .select('title, content, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      setLatestNews(data);
      setLoading(false);
    };

    fetchLatestNews();

    const channel = supabase.channel('realtime-news')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, fetchLatestNews)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <Container my="xl" className={classes.container}>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={12} radius="xl" />
        <Skeleton height={8} mt={10} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Container>
    );
  }

  if (!latestNews) return null;

  return (
    <Container my="xl" className={classes.container}>
      <Paper 
        shadow="xl" 
        radius="lg" 
        p="xl" 
        withBorder
        className={classes.card} // Adiciona a classe principal para o estilo
        style={{ backgroundImage: `url(${latestNews.image_url || ''})` }}
      >
        <div className={classes.overlay} /> {/* Camada para escurecer o fundo da imagem */}
        <div className={classes.content}> {/* Conteúdo principal */}
          <Text size="xs" tt="uppercase" className={classes.label}>ÚLTIMA NOVIDADE</Text>
          <Title order={2} mt="sm" className={classes.title}>{latestNews.title}</Title>
          <Text mt="md" lineClamp={3} className={classes.description}>{latestNews.content}</Text>
          <Button component={Link} to="/news" variant="gradient" mt="xl" size="md" gradient={{ from: 'cyan', to: 'lime' }}>
            Ver todas as novidades
          </Button>
        </div>
      </Paper>
    </Container>
  );
}
