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
              src="https://i.imgur.com/GBUfZgy.png"
              alt="Demonstração do FactionFlow"
            />
          </motion.div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Title order={2} mb="lg">Eleve a gestão da sua facção ao nível profissional.</Title>
          <Text c="dimmed" mt="md" mb="lg">
            Administrar uma comunidade de facções é um desafio de alta complexidade. O FactionFlow foi criado para ser a central de comando que automatiza tarefas repetitivas, otimiza a comunicação e garante segurança, liberando seu tempo para focar no crescimento da comunidade.
          </Text>
          <List mt="lg" spacing="sm" size="sm">
            <List.Item>
              ✅ <b>Gestão de Membros e Hierarquia:</b> Automatize o registro de novos membros e a padronização de tags com base na hierarquia, mantendo a organização e o profissionalismo do seu servidor.
            </List.Item>
            <List.Item>
              ✅ <b>Economia e Finanças Avançadas:</b> Registre vendas e investimentos com logs detalhados, controle o fluxo de caixa da facção e visualize o desempenho financeiro em um dashboard completo com gráficos e relatórios.
            </List.Item>
            <List.Item>
              ✅ <b>Tudo isso e muito mais, clique em saiba mais.
            </List.Item>
          </List>
        </Grid.Col>
      </Grid>

      {/* Seção TicketUltra */}
      <Grid gutter={50} align="center" mt={60}>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <Title order={2} mb="lg">Transforme o caos do suporte em organização.</Title>
          <Text c="dimmed" mt="md" mb="lg">
            Mensagens diretas perdidas, dúvidas repetidas no chat geral, falta de organização... Um suporte ruim frustra seus membros. O TicketUltra centraliza e profissionaliza o seu canal de comunicação, garantindo a agilidade e a transparência que a sua comunidade merece.
          </Text>
          <List mt="lg" spacing="sm" size="sm">
            <List.Item>
              ✅ <b>Suporte Centralizado e Departamentos:</b> Crie painéis de tickets com múltiplos departamentos, direcionando cada solicitação para a equipe responsável de forma automática.
            </List.Item>
            <List.Item>
              ✅ <b>Transcrições e Histórico Completo:</b> Mantenha um registro de todas as conversas para auditoria e referência futura. Cada ticket é transcrito, oferecendo total transparência.
            </List.Item>
            <List.Item>
              ✅ <b>Gestão e Ranking de Performance:</b> Dê à sua equipe as ferramentas para o sucesso. Gerencie o fluxo de atendimentos e acesse um ranking de desempenho com base na quantidade e velocidade de resolução dos tickets.
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


