import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Container, Title, Text, Textarea, Button, Paper, Group, Notification } from '@mantine/core';
import classes from './FeedbackPage.module.css';

// Ícones SVG locais
const IconCheck = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}> <path d="M5 12l5 5l10 -10" /> </svg> );
const IconX = (props: React.ComponentProps<'svg'>) => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}> <path d="M18 6l-12 12" /> <path d="M6 6l12 12" /> </svg> );

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

    try {
      // ▼▼▼ CHAMADA PARA A SUPABASE FUNCTION ▼▼▼
      const { error: functionError } = await supabase.functions.invoke('submit-feedback', {
        body: { rating, comment }, // Enviamos apenas os dados do formulário
      });

      if (functionError) {
        // Se a função retornar um erro, nós o capturamos aqui.
        throw functionError;
      }

      // Se tudo deu certo:
      setSuccess('Seu feedback foi enviado para moderação. Obrigado!');
      setRating(0);
      setComment('');

    } catch (err: any) {
      // Pega o erro e exibe para o usuário.
      console.error('Erro ao enviar feedback:', err);
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      // Garante que o botão seja reativado no final.
      setIsSubmitting(false);
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
                <span key={star} className={star <= (hoverRating || rating) ? classes.starFilled : classes.star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}>★</span>
              ))}
            </div>
          </Group>

          <Textarea label="Seu Comentário" placeholder="Conte-nos como foi sua experiência..." required mt="md" value={comment} onChange={(event) => setComment(event.currentTarget.value)} minRows={4}/>
          
          {error && (<Notification icon={<IconX style={{ width: '1.1rem', height: '1.1rem' }} />} color="red" mt="md" onClose={() => setError('')}>{error}</Notification>)}
          {success && (<Notification icon={<IconCheck style={{ width: '1.1rem', height: '1.1rem' }} />} color="teal" title="Sucesso!" mt="md" onClose={() => setSuccess('')}>{success}</Notification>)}

          <Button type="submit" fullWidth mt="xl" loading={isSubmitting}>
            Enviar Feedback
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
