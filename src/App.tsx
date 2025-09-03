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
import { AdminOverview } from './pages/AdminOverview';
import { MarqueeManager } from './pages/MarqueeManager';
import { StatusManager } from './pages/StatusManager'; // 1. IMPORTE A PÁGINA

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* === Rotas Públicas e de Usuário (sem alterações) === */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bots/factionflow" element={<FactionFlowPage />} />
        <Route path="/bots/ticketultra" element={<TicketUltraPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/request-bot" element={<RequestBotPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="my-bots" element={<MyBotsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>

        {/* === Rotas Protegidas para Administradores === */}
        <Route
          path="/admin"
          element={<AdminRoute><AdminPage /></AdminRoute>}
        >
          <Route index element={<AdminOverview />} />
          <Route path="marquee" element={<MarqueeManager />} />
          <Route path="status" element={<StatusManager />} /> {/* 2. ROTA ADICIONADA */}
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
