// src/components/Faq.tsx
import { Container, Title, Accordion } from '@mantine/core';

const faqItems = [
  {
    question: 'Preciso saber programar para usar os bots?',
    answer: 'Absolutamente não! Nossos bots são configurados através de comandos simples e intuitivos no Discord. Fornecemos guias completos para te ajudar em cada passo.',
  },
  {
    question: 'O bot fica online 24/7?',
    answer: 'Sim. Nossos bots são hospedados em infraestrutura de alta disponibilidade na Discloud, garantindo que eles estejam sempre online e prontos para servir sua comunidade.',
  },
  {
    question: 'Como funciona o suporte se eu tiver um problema?',
    answer: 'Oferecemos suporte prioritário para todos os nossos clientes premium. Basta entrar em nossa comunidade do Discord e abrir um ticket, e nossa equipe estará pronta para te ajudar.',
  },
  {
    question: 'Posso customizar as mensagens e cores?',
    answer: 'Sim! A maioria dos nossos bots permite um alto nível de customização, desde as mensagens enviadas até as cores dos painéis (embeds), para que tudo fique com a cara do seu servidor.',
  },
];

export function Faq() {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center">Perguntas Frequentes</Title>
      <Accordion variant="separated" mt="xl">
        {faqItems.map(item => (
          <Accordion.Item key={item.question} value={item.question}>
            <Accordion.Control>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}