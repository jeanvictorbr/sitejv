import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Paper, Avatar, Group, Skeleton, Center, Alert } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';
import classes from './FeedbacksPublicPage.module.css';

// Definimos o tipo de dado para um feedback
interface Feedback {
  id: string;
  created_at: string;
  user_display_name: string;
  user_avatar_url: string;
  rating: number;
  comment: string;
}

// Componente para renderizar as estrelas
const StarRating = ({ rating }: { rating: number }) => {
  const stars = '⭐'.repeat(rating) + '✩'.repeat(5 - rating);
  return <Text c="yellow">{stars}</Text>;
};


const FeedbacksPublicPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError('');

      // Busca apenas os feedbacks com 'is_visible = true'
      // Ordena pelos mais recentes primeiro
      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Erro ao buscar feedbacks:', fetchError);
        setError('Não foi possível carregar os feedbacks.');
      } else {
        setFeedbacks(data);
      }
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <Container size="md" py={40}>
      <Title ta="center" className={classes.title}>
        O que nossos usuários dizem
      </Title>
      <Text c="dimmed" size="lg" ta="center" mt="md" mb={50}>
        Feedbacks reais de pessoas que usam nossos serviços.
      </Text>

      {loading && (
        <div className={classes.feedbackGrid}>
            {[...Array(3)].map((_, index) => (
                <Paper withBorder p="md" radius="md" key={index}>
                    <Group>
                        <Skeleton height={40} circle />
                        <Skeleton height={20} width={150} />
                    </Group>
                    <Skeleton height={15} mt="sm" />
                    <Skeleton height={15} mt="xs" width="70%" />
                </Paper>
            ))}
        </div>
      )}

      {error && (
         <Alert icon={<IconMoodSad size="1rem" />} title="Ocorreu um erro!" color="red" variant="light">
           {error} Por favor, tente novamente mais tarde.
         </Alert>
      )}

      {!loading && !error && feedbacks.length === 0 && (
         <Center>
            <Text c="dimmed">Ainda não há feedbacks para exibir.</Text>
         </Center>
      )}

      {!loading && !error && feedbacks.length > 0 && (
        <div className={classes.feedbackGrid}>
          {feedbacks.map((feedback) => (
            <Paper withBorder p="xl" radius="md" key={feedback.id} className={classes.card}>
              <Group>
                <Avatar src={feedback.user_avatar_url} alt={feedback.user_display_name} radius="xl" size="lg" />
                <div>
                  <Text fz="lg" fw={500}>{feedback.user_display_name}</Text>
                  <StarRating rating={feedback.rating} />
                </div>
              </Group>
              <Text pl={64} pt="sm" fz="sm">
                "{feedback.comment}"
              </Text>
            </Paper>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FeedbacksPublicPage;