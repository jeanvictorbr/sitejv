// src/pages/RequestBotPage.tsx
import { TextInput, Textarea, Button, Container, Title, Text, Box, SimpleGrid, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import Confetti from 'react-confetti';

export function RequestBotPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  // ▼▼▼ IMPORTANTE: Lembre-se de colocar a URL do seu Webhook do Discord aqui ▼▼▼
  const WEBHOOK_URL = 'https://discord.com/api/webhooks/1405431695758463056/cMkYoGKpXNEjbf6ZP4xvXt2w89h7OkE4cQuwgIz5QRbWSmwxXcyP-4k6jX-t1Hne7Ieh';

  const form = useForm({
    initialValues: {
      name: '',
      discordUser: '',
      botName: '',
      botDescription: '',
      botFeatures: '',
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? 'O nome é muito curto' : null),
      discordUser: (value) => (!value.includes('#') ? 'Inclua seu nome de usuário completo do Discord (Ex: usuario#1234)' : null),
      botDescription: (value) => (value.trim().length < 20 ? 'Descreva seu bot com um pouco mais de detalhe' : null),
      botFeatures: (value) => (value.trim().length < 10 ? 'Liste pelo menos uma funcionalidade principal' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setSubmitStatus('');
    setShowConfetti(false);

    const discordEmbed = {
      username: 'JV Store - Solicitações de Bots',
      avatar_url: 'https://i.imgur.com/4M34hi2.png',
      embeds: [
        {
          author: {
            name: values.name,
          },
          title: `Nova Solicitação de Bot: ${values.botName || 'Nome a definir'}`,
          description: values.botDescription,
          color: 3447003,
          fields: [
            {
              name: 'Funcionalidades Principais',
              value: values.botFeatures,
            },
            {
              name: 'Usuário do Discord para Contato',
              value: `\`${values.discordUser}\``,
              inline: true,
            },
          ],
          footer: {
            text: `Solicitação enviada em: ${new Date().toLocaleString('pt-BR')}`,
          },
        },
      ],
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordEmbed),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setShowConfetti(true);
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <Container py="xl">
      {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
      
      <Title order={1} ta="center">Solicite um Bot Personalizado</Title>
      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Tem uma ideia para um bot que resolveria os problemas do seu servidor? Descreva sua necessidade e nossa equipe entrará em contato para transformar sua ideia em realidade.
      </Text>

      <Box maw={800} mx="auto" mt="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              withAsterisk
              label="Seu Nome"
              placeholder="Como podemos te chamar?"
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="Seu Usuário do Discord"
              placeholder="usuario#1234"
              {...form.getInputProps('discordUser')}
            />
          </SimpleGrid>

          <TextInput
            mt="md"
            label="Nome do Bot (Opcional)"
            placeholder="Qual nome você imagina para seu bot?"
            {...form.getInputProps('botName')}
          />

          <Textarea
            mt="md"
            withAsterisk
            label="Descrição Detalhada do Bot"
            placeholder="Descreva em detalhes o que seu bot deve fazer, qual o objetivo dele e como ele ajudaria sua comunidade."
            minRows={4}
            {...form.getInputProps('botDescription')}
          />

          <Textarea
            mt="md"
            withAsterisk
            label="Funcionalidades Principais"
            placeholder="Liste as 3 a 5 funcionalidades mais importantes em formato de lista. Ex: - Sistema de economia\n- Moderação automática\n- Registro de logs"
            minRows={3}
            {...form.getInputProps('botFeatures')}
          />

          <Group justify="right" mt="xl">
            {submitStatus === 'success' && <Text c="green">Solicitação enviada com sucesso!</Text>}
            {/* A CORREÇÃO ESTÁ AQUI */}
            {submitStatus === 'error' && <Text c="red">Ocorreu um erro. Tente novamente.</Text>}
            <Button type="submit" loading={isSubmitting} size="lg">
              Enviar Solicitação
            </Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}