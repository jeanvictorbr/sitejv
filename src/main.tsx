// src/main.tsx
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // A ORDEM CORRETA E FINAL:
  <BrowserRouter>       {/* 1º - O Roteador, que gerencia as páginas */}
    <MantineProvider defaultColorScheme="dark">   {/* 2º - O Provedor de Estilos, que dá o visual */}
      <AuthProvider>    {/* 3º - O Provedor de Login, que usa os estilos para o 'loading' */}
        <App />
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);