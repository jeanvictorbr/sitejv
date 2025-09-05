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
import { StatusManager } from './pages/StatusManager';
import { NewsManager } from './pages/NewsManager';

// --- Importações do Sistema de Feedback ---
import FeedbackPage from './pages/FeedbackPage';
import FeedbacksPublicPage from './pages/FeedbacksPublicPage';
import FeedbackManager from './pages/FeedbackManager';

// ▼▼▼ CAMINHO DE IMPORTAÇÃO CORRIGIDO ▼▼▼
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <Routes>
      {/* Rotas que USAM o layout principal */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bots/factionflow" element={<FactionFlowPage />} />
        <Route path="/bots/ticketultra" element={<TicketUltraPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/request-bot" element={<RequestBotPage />} />
        <Route path="/feedbacks" element={<FeedbacksPublicPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
          <Route index element={<DashboardOverview />} />
          <Route path="my-bots" element={<MyBotsPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
        </Route>
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={<AdminRoute><AdminPage /></AdminRoute>}
        >
          <Route index element={<AdminOverview />} />
          <Route path="marquee" element={<MarqueeManager />} />
          <Route path="status" element={<StatusManager />} />
          <Route path="feedbacks" element={<FeedbackManager />} />
          <Route path="news" element={<NewsManager />} />
        </Route>
      </Route>
      
      {/* Rota do Chat, que NÃO USA o layout principal */}
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
