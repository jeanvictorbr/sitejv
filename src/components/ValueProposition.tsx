import { Container, Grid, Title, Text, List, Image } from '@mantine/core';
import { motion } from 'framer-motion';

export function ValueProposition() {
  const floatingAnimation: any = {
    animate: {
      y: ["-5px", "5px"],
    },
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    }
  };

  return (
    <Container size="lg">
      {/* Seção FactionFlow */}
      <Grid gutter={50} align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <motion.div {...floatingAnimation}>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=2070"
              alt="Demonstração do FactionFlow"
            />
          </motion.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2} mb="lg">Chega de passar horas batendo cabeça..</Title>
          <Text c="dimmed" mt="md" mb="lg">
            Administrar um servidor de facções/organizaçoes é complexo. Membros entram e saem, recrutamentos acontecem,muita coisa ao mesmo tempo... O FactionFlow elimina o trabalho manual para que você possa focar no que realmente importa: a experiência da sua comunidade.
          </Text>
          <List mt="lg" spacing="sm" size="sm">
            <List.Item>
              ✅ <b>Gestão de Membros Automatizada:</b> Convites, promoções e expulsões com menus simples. Chega de editar tags , fazer recrutamentos, hierarquia  manualmente.
            </List.Item>
            <List.Item>
              ✅ <b>Economia Precisa e Segura:</b> Controle o banco da facção, registre transações e evite abusos com um sistema de logs completo , com um dashboard de finanças para a gestão inteligente.
            </List.Item>
            <List.Item>
              ✅ <b>Essas e muitas outras funções:</b>Defina tudo configure tudo facilmente por meio de menus, vc nao precisa decorar códigos complexos nem nada, é tudo simples e direto ao ponto.
            </List.Item>
          </List>
        </Grid.Col>
      </Grid>

      {/* Seção TicketUltra */}
      <Grid gutter={50} align="center" mt={60}>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <Title order={2} mb="lg">Transforme o caos do suporte em organização.</Title>
          <Text c="dimmed" mt="md" mb="lg">
            Mensagens diretas perdidas, dúvidas repetidas no chat geral, falta de organização... Um suporte ruim frustra seus membros. O TicketUltra centraliza tudo, criando um canal de comunicação profissional e eficiente.
          </Text>
          <List mt="lg" spacing="sm" size="sm">
            <List.Item>
              ✅ <b>Centralize Todo o Suporte:</b> Diga adeus às DMs. Todos os pedidos de ajuda, denúncias e dúvidas ficam organizados em um só lugar.
            </List.Item>
            <List.Item>
              ✅ <b>Atendimento Ágil e Colaborativo:</b> Sua equipe pode ver quais tickets estão abertos, assumir responsabilidades e resolver problemas em conjunto.
            </List.Item>
            <List.Item>
              ✅ <b>Histórico Completo e Transcrições:</b> Mantenha um registro de todas as conversas para consultas futuras e para garantir a qualidade do seu suporte, alem de um painel de gerenciamento completo, incluindo RANKING de atendimentos e qualidade.
            </List.Item>
          </List>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
          <motion.div {...floatingAnimation}>
            <Image
              radius="md"
              src="https://i.imgur.com/mltV2eJ.gif"
              alt="Demonstração do TicketUltra"
            />
          </motion.div>
        </Grid.Col>
      </Grid>
    </Container>
  );

}
