import { Container, Title, Text, Badge, Group, Button, Divider, Card, List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Lista de todos os módulos do FactionFlow
const allModules = [
  'Sistema de Registro e Recrutamento',
  'Ranking de Recrutadores',
  'Gestão Financeira Completa',
  'Gráficos e Relatórios de Performance',
  'Sincronização de Hierarquia Automática',
  'Sistema de Tags Dinâmicas',
  'Módulo de Conduta e Segurança',
  'Blacklist Automática',
  'Gerenciamento de Alianças Estratégicas',
  'Organização de Operações Táticas',
  'Depuração Inteligente de Inativos',
  'Módulo de Sorteios Profissionais',
  'Criador de Embeds Customizadas',
  'Comunicação em Massa'
];

const starterModules = [
  'Sistema de Registro e Recrutamento',
  'Gestão Financeira Completa',
  'Módulo de Conduta e Segurança',
  'Gerenciamento de Alianças Estratégicas',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export function PricingPage() {
  const plans = [
    {
      name: 'Teste Gratuito',
      price: 'R$ 0/mês',
      description: 'Experimente a potência do FactionFlow com um período de teste de 7 dias.',
      features: ['Acesso a 1 módulo a sua escolha', 'Suporte Básico', 'Dashboard de Análise'],
      buttonText: 'Experimentar Grátis',
      buttonLink: '#',
      variant: 'default',
    },
    {
      name: 'Plano Básico',
      price: 'R$ 29,99/mês',
      description: 'Perfeito para servidores que precisam de ferramentas essenciais de gestão.',
      features: allModules.map(module => ({
        text: module,
        included: starterModules.includes(module)
      })),
      buttonText: 'Assinar Plano Básico',
      buttonLink: '#',
      variant: 'gradient',
      gradient: { from: 'blue', to: 'cyan' },
      highlight: true,
    },
    {
      name: 'Plano Completo',
      price: 'R$ 44,99/mês',
      description: 'Tenha acesso irrestrito a todos os módulos e funcionalidades avançadas do bot.',
      features: allModules.map(module => ({
        text: module,
        included: true
      })),
      buttonText: 'Assinar Plano Completo',
      buttonLink: '#',
      variant: 'gradient',
      gradient: { from: 'violet', to: 'indigo' },
    },
  ];

  return (
    <Container size="lg" py="xl">
      <Group justify="center" ta="center">
        <Badge variant="gradient" gradient={{ from: 'lime', to: 'green' }} size="xl">
          Nossos Planos
        </Badge>
      </Group>

      <Title order={1} ta="center" mt="lg">
        Encontre o plano ideal para a sua comunidade.
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={700} mx="auto">
        Oferecemos soluções flexíveis, feitas para se adaptarem às necessidades de qualquer tipo de servidor. Comece com o teste gratuito ou escolha um de nossos planos para desbloquear todo o potencial de gestão.
      </Text>

      <Divider my="xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt="lg">
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card shadow="sm" padding="xl" radius="md" withBorder h="100%"
                    style={plan.highlight ? { border: '2px solid #228be6' } : {}}>
                <Group justify="center" mb="md">
                  <Badge variant={plan.variant} gradient={plan.gradient} size="xl">
                    {plan.name}
                  </Badge>
                </Group>
                <Title order={2} ta="center" mb="xs">
                  {plan.price}
                </Title>
                <Text c="dimmed" ta="center" mb="lg">{plan.description}</Text>
                
                <List
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <IconCircleCheck size={16} />
                    </ThemeIcon>
                  }
                >
                  {plan.features.map((feature, idx) => (
                    <List.Item
                      key={idx}
                      icon={feature.included ? 
                        <ThemeIcon color="teal" size={20} radius="xl"><IconCircleCheck style={{ width: '1rem', height: '1rem' }} /></ThemeIcon>
                      :
                        <ThemeIcon color="gray" size={20} radius="xl"><IconCircleDashed style={{ width: '1rem', height: '1rem' }} /></ThemeIcon>
                      }
                      style={{ color: feature.included ? 'inherit' : 'var(--mantine-color-dimmed)' }}
                    >
                      {feature.text}
                    </List.Item>
                  ))}
                </List>
                <Button 
                  fullWidth 
                  mt="xl" 
                  size="lg" 
                  variant={plan.variant} 
                  gradient={plan.gradient}
                  component="a" 
                  href={plan.buttonLink}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </motion.div>
    </Container>
  );
}
