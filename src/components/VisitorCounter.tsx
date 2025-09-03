// src/components/VisitorCounter.tsx (VERSÃO DE TESTE SIMPLIFICADA)
import { Text, Group } from '@mantine/core';
import { Users } from 'tabler-icons-react';

const VisitorCounter = () => {
  return (
    // Adicionamos um estilo para garantir que ele seja visível
    <div style={{ padding: '1rem', backgroundColor: 'rgba(0, 255, 0, 0.1)' }}>
      <Group justify="center" gap="xs">
        <Users size={18} />
        <Text size="sm" c="dimmed">
          Teste do Contador: 12345 visitantes.
        </Text>
      </Group>
    </div>
  );
};

export default VisitorCounter;
