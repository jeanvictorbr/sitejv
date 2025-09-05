import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Indicator, ActionIcon, Popover, Text, Stack, Skeleton } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './Widget.module.css';

// Ícone de Sino
const IconBell = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg> );

interface News { id: string; title: string; created_at: string; }

export function NewsNotification() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from('news').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(3);
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <Popover width={280} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Indicator label={news.length} size={16} disabled={news.length === 0}>
          <ActionIcon variant="transparent" color="gray">
            <IconBell size={18} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Text fw={500}>Últimas Novidades</Text>
          {loading ? <Skeleton height={20} count={2} /> : news.map(item => (
            <Text key={item.id} component={Link} to="/news" size="sm" className={classes.newsLink}>
              {item.title}
            </Text>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
