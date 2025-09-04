import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, Avatar, Group, Skeleton, Center, Alert } from '@mantine/core';
import classes from './FeedbacksPublicPage.module.css';

// Ícone SVG embutido
const IconMoodSad = (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" /></svg>
);
interface Feedback { id: string; created_at: string; user_display_name: string; user_avatar_url: string; rating: number; comment: string; }
const StarRating = ({ rating }: { rating: number }) => { const stars = '⭐'.repeat(rating) + '✩'.repeat(5 - rating); return <Text c="yellow">{stars}</Text>; };

const FeedbacksPublicPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true); setError('');
      const { data, error: fetchError } = await supabase.from('feedbacks').select('*').eq('is_visible', true).order('created_at', { ascending: false });
      if (fetchError) { console.error('Erro:', fetchError); setError('Não foi possível carregar os feedbacks.'); } else { setFeedbacks(data as Feedback[]); }
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);

  return (
    <Container size="md" py={40}>
      <Title ta="center" className={classes.title}>O que nossos usuários dizem</Title>
      <Text c="dimmed" size="lg" ta="center" mt="md" mb={50}>Feedbacks reais de pessoas que usam nossos serviços.</Text>
      {loading && (<div className={classes.feedbackGrid}>{[...Array(3)].map((_, index) => (<Paper withBorder p="md" radius="md" key={index}><Group><Skeleton height={40} circle /><Skeleton height={20} width={150} /></Group><Skeleton height={15} mt="sm" /><Skeleton height={15} mt="xs" width="70%" /></Paper>))}</div>)}
      {error && (<Alert icon={<IconMoodSad style={{width: 20, height: 20}}/>} title="Ocorreu um erro!" color="red" variant="light">{error} Por favor, tente novamente mais tarde.</Alert>)}
      {!loading && !error && feedbacks.length === 0 && (<Center><Text c="dimmed">Ainda não há feedbacks para exibir.</Text></Center>)}
      {!loading && !error && feedbacks.length > 0 && (
        <div className={classes.feedbackGrid}>
          {feedbacks.map((feedback) => (
            <Paper withBorder p="xl" radius="md" key={feedback.id} className={classes.card}>
              {/* === INÍCIO DA MUDANÇA === */}
              <Group justify="space-between">
                <Group>
                  <Avatar src={feedback.user_avatar_url} alt={feedback.user_display_name} radius="xl" size="lg" />
                  <div>
                    <Text fz="lg" fw={500}>{feedback.user_display_name}</Text>
                    <Text size="xs" c="dimmed">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </Text>
                  </div>
                </Group>
                <StarRating rating={feedback.rating} />
              </Group>
              {/* === FIM DA MUDANÇA === */}
              <Text pl={58} pt="sm" fz="sm">"{feedback.comment}"</Text>
            </Paper>
          ))}
        </div>
      )}
    </Container>
  );
};
export default FeedbacksPublicPage;
