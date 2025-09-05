import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, SimpleGrid, Skeleton } from '@mantine/core';
import { motion } from 'framer-motion';
import { NewsCard } from '../components/NewsCard'; // Importa o novo NewsCard
import classes from './NewsListPage.module.css'; // Importa o CSS da página

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

  const skeletonCards = Array(6).fill(0).map((_, index) => ( // Mais skeletons
    <Skeleton key={index} height={300} radius="md" />
  ));

  // Animações para os cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Atraso entre a animação de cada card
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={classes.pageWrapper} // Aplica o estilo de fundo aqui
    >
      <Container size="lg" py="xl">
        <Title order={1} ta="center" mb="md" className={classes.mainTitle}>Todas as Novidades</Title>
        <Text ta="center" c="dimmed" mb="xl" className={classes.subtitle}>Fique por dentro das últimas notícias e atualizações da JV Store!</Text>

        {loading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {skeletonCards}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {news.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <NewsCard
                  id={article.id}
                  title={article.title}
                  content={article.content}
                  imageUrl={article.image_url || ''}
                  createdAt={article.created_at}
                />
              </motion.div>
            ))}
            {news.length === 0 && (
              <Text c="dimmed" ta="center" style={{ gridColumn: '1 / -1' }}>Nenhuma novidade publicada ainda.</Text>
            )}
          </SimpleGrid>
        )}
      </Container>
    </motion.div>
  );
}
