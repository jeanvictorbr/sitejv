import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Textarea, Button, Paper, Group, Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import classes from './FeedbackPage.module.css';

const FeedbackPage = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Limpa mensagens anteriores
    setError('');
    setSuccess('');

    if (!user) {
      setError('Você precisa estar logado para enviar um feedback.');
      return;
    }
    if (rating === 0) {
      setError('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Seu comentário precisa ter pelo menos 10 caracteres.');
      return;
    }

    setIsSubmitting(true);

    const feedbackData = {
      user_id: user.id,
      user_display_name: user.user_metadata?.user_name || user.user_metadata?.full_name || 'Usuário Anônimo',
      user_avatar_url: user.user_metadata?.avatar_url,
      rating,
      comment,
    };

    const { error: insertError } = await supabase
      .from('feedbacks')
      .insert(feedbackData);

    setIsSubmitting(false);

    if (insertError) {
      console.error('Erro ao enviar feedback:', insertError);
      setError(`Ocorreu um erro: ${insertError.message}`);
    } else {
      setSuccess('Seu feedback foi enviado para moderação. Obrigado!');
      setRating(0);
      setComment('');
    }
  };

  return (
    <Container size="sm" my={40}>
      <Title ta="center" className={classes.title}>
        Deixe seu Feedback
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Sua opinião é muito importante para nós!
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Group justify="center" className={classes.ratingSection}>
            <Text fw={500}>Sua Avaliação:</Text>
            <div className={classes.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= (hoverRating || rating) ? classes.starFilled : classes.star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </Group>

          <Textarea
            label="Seu Comentário"
            placeholder="Conte-nos como foi sua experiência..."
            required
            mt="md"
            value={comment}
            onChange={(event) => setComment(event.currentTarget.value)}
            minRows={4}
          />
          
          {error && (
            <Notification icon={<IconX size="1.1rem" />} color="red" mt="md" onClose={() => setError('')}>
              {error}
            </Notification>
          )}

          {success && (
            <Notification icon={<IconCheck size="1.1rem" />} color="teal" title="Sucesso!" mt="md" onClose={() => setSuccess('')}>
              {success}
            </Notification>
          )}


          <Button type="submit" fullWidth mt="xl" loading={isSubmitting}>
            Enviar Feedback
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
