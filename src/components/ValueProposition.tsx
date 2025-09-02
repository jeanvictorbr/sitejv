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
          <Title order={2} mb="lg">Chega de passar horas batendo cabeça.</Title>
          <Text c="dimmed" mt="md" mb="lg">
            Administrar um servidor de facções e organizações é complexo. Membros entram e saem, recrutamentos acontecem, a economia precisa de atenção, e manter a ordem é um desafio constante. O FactionFlow é a solução definitiva que automatiza o trabalho manual para que você possa focar no que realmente importa: a experiência da sua comunidade.
          </Text>
          <List mt="lg" spacing="sm" size="sm">
            <List.Item>
              ✅ <b>Gestão de Membros Automatizada:</b> Gerencie a entrada de novos membros, a hierarquia de cargos e a padronização de apelidos com menus simples e eficientes.
            </List.Item>
            <List.Item>
              ✅ <b>Economia Precisa e Segura:</b> Controle o banco da facção, registre transações de vendas e investimentos e tenha acesso a um dashboard de finanças completo, com gráficos de performance e relatórios detalhados.
            </List.Item>
            <List.Item>
              ✅ <b>Módulos de Segurança e Punição:</b> Aplique punições, gerencie regras com um código penal customizável e proteja o servidor com um sistema de blacklist automática contra usuários mal-intencionados.
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
              ✅ <b>Atendimento Ágil e Colaborativo:</b> Sua equipe pode ver quais tickets estão abertos, assumir responsabilidades e resolver problemas em conjunto, com a possibilidade de transcrever o histórico completo da conversa.
            </List.Item>
            <List.Item>
              ✅ <b>Gestão de Performance da Equipe:</b> Um painel completo permite que a liderança gerencie e avalie a performance do suporte. O sistema inclui um ranking de atendimentos e a qualidade das resoluções.
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
