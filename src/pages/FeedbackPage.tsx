import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import styles from './FeedbackPage.module.css';

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
    setError('');
    setSuccess('');

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
    <div className={styles.feedbackContainer}>
      <h2>Deixe seu Feedback</h2>
      <p>Sua opinião é muito importante para nós!</p>
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <div className={styles.ratingSection}>
          <label>Avaliação</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= (hoverRating || rating) ? styles.starFilled : styles.star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className={styles.commentSection}>
          <label htmlFor="comment">Comentário</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Conte-nos como foi sua experiência..."
            rows={5}
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
