import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, Button, Skeleton, ActionIcon, Group, Image } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './NewsHighlight.module.css';

// --- Ícones SVG ---
const IconChevronLeft = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6" /></svg> );
const IconChevronRight = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6" /></svg> );
// ------------------

interface NewsArticle {
  title: string;
  content: string;
  image_url?: string;
}

export function NewsHighlight() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('news')
        .select('title, content, image_url')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(4); // Busca as 4 últimas novidades
      
      setNews(data || []);
      setLoading(false);
    };
    fetchLatestNews();
  }, []);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? news.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === news.length - 1 ? 0 : prev + 1));

  if (loading) {
    return (
      <Container my="xl" className={classes.container}>
        <Skeleton height={300} radius="lg" />
      </Container>
    );
  }

  if (news.length === 0) return null;

  const currentNews = news[currentIndex];

  return (
    <Container my="xl" className={classes.container}>
      <Paper shadow="xl" radius="lg" withBorder className={classes.card}>
        <div className={classes.contentWrapper}>
          <div className={classes.textContent}>
            <Text size="xs" tt="uppercase" className={classes.label}>ÚLTIMAS NOVIDADES</Text>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Title order={2} mt="sm" className={classes.title}>{currentNews.title}</Title>
                <Text mt="md" lineClamp={4} className={classes.description}>{currentNews.content}</Text>
              </motion.div>
            </AnimatePresence>
            <div className={classes.footer}>
              <Text size="sm" c="dimmed">{currentIndex + 1} / {news.length}</Text>
              <Group>
                <ActionIcon onClick={handlePrev} variant="outline" className={classes.navButton}><IconChevronLeft /></ActionIcon>
                <ActionIcon onClick={handleNext} variant="outline" className={classes.navButton}><IconChevronRight /></ActionIcon>
              </Group>
            </div>
          </div>
          <div className={classes.imageContent}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={classes.imageWrapper}
                >
                    {currentNews.image_url && (
                        <Image src={currentNews.image_url} alt={currentNews.title} className={classes.image} />
                    )}
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Paper>
    </Container>
  );
}
