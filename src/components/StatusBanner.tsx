// src/components/StatusBanner.tsx
import { useState } from 'react';
import { Box, Container, Text, Badge } from '@mantine/core';
import classes from './StatusBanner.module.css';

type StatusType = 'operational' | 'degraded' | 'maintenance';

// Objeto de configuração para cada status, com textos mais profissionais
const statusConfig = {
  operational: {
    color: 'green',
    icon: '✅',
    label: 'Todos os bots estão operacionais.',
  },
  degraded: {
    color: 'orange',
    icon: '⚠️',
    label: 'Nossos bots estão enfrentando instabilidade. A equipe já está investigando.',
  },
  maintenance: {
    color: 'blue',
    icon: '🛠️',
    label: 'Estamos em manutenção programada. Os bots podem apresentar lentidão.',
  },
};

export function StatusBanner() {
  // DADOS DE EXEMPLO: Mude 'operational' para ver a barra mudar de cor!
  const [currentStatus, setCurrentStatus] = useState<StatusType>('operational');
  
  const config = statusConfig[currentStatus];

  return (
    <Box className={classes.wrapper} data-status={currentStatus}>
      <Container size="lg" className={classes.inner}>
        <Badge
          color={config.color}
          variant="filled"
          size="lg"
          leftSection={<Text>{config.icon}</Text>}
        >
          {config.label}
        </Badge>
      </Container>
    </Box>
  );
}