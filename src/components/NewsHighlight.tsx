// src/components/NewsHighlight.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, Button, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './NewsHighlight.module.css';

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
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data) setLatestNews(data);
      if (error) console.log("Sem novidades para exibir ou erro:", error.message);
      
      setLoading(false);
    };

    fetchLatestNews();

    // Opcional: ouvir por novas publicações em tempo real
    const channel = supabase.channel('realtime-news')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, fetchLatestNews)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <Container my="xl">
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </Container>
    );
  }

  if (!latestNews) {
    return null; // Não renderiza nada se não houver novidades
  }

  return (
    <Container my="xl">
      <Paper 
        shadow="xl" 
        radius="lg" 
        p="xl" 
        withBorder
        style={{
          backgroundImage: `url(${latestNews.image_url || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 'inherit',
          zIndex: 1,
        }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <Title order={2} style={{ color: 'var(--mantine-color-cyan-4)' }}>ÚLTIMA NOVIDADE</Title>
          <Title order={3} mt="md">{latestNews.title}</Title>
          <Text mt="md" lineClamp={3}>{latestNews.content}</Text>
          <Button component={Link} to="/news" variant="gradient" mt="xl" size="lg">
            Ver todas as novidades
          </Button>
        </div>
      </Paper>
    </Container>
  );
}
