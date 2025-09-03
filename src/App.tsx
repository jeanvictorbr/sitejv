// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FactionFlowPage } from './pages/FactionFlowPage';
import { TicketUltraPage } from './pages/TicketUltraPage';
import { MainLayout } from './components/MainLayout';
import { PricingPage } from './pages/PricingPage';
import { RequestBotPage } from './pages/RequestBotPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { DashboardOverview } from './pages/DashboardOverview';
import { MyBotsPage } from './pages/MyBotsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { AdminRoute } from './components/auth/AdminRoute';
import { AdminPage } from './pages/AdminPage';
import { MarqueeManager } from './pages/MarqueeManager';
import { AdminOverview } from './pages/AdminOverview'; // 1. IMPORTE O NOVO COMPONENTE
import { StatusManager } from './pages/StatusManager'; 

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* === Rotas Públicas === */}
        <Route path="/" element={<HomePage />} />
        <Route path="/bots/factionflow" element={<FactionFlowPage />} />
        <Route path="/bots/ticketultra" element={<TicketUltraPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/request-bot" element={<RequestBotPage />} />
        <Route path="/login" element={<LoginPage />} />
 

        {/* === Rotas Protegidas para Usuários === */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="my-bots" element={<MyBotsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
        
        {/* === Rota Protegida para Administradores === */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        >
          {/* Sub-rotas do Painel de Admin */}
          <Route index element={<AdminOverview />} /> {/* 2. ADICIONE A ROTA INDEX */}
          <Route path="marquee" element={<MarqueeManager />} />
          <Route path="status" element={<StatusManager />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
