import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import MLRiskEnginePage from './pages/MLRiskEnginePage';
import HelpdeskPage from './pages/HelpdeskPage';
import MedicalSupplyFundingPage from './pages/MedicalSupplyFundingPage';
import SaaSNavbar from './components/SaaSNavbar';
import LandingHeroSection from './components/LandingHeroSection';
import LoginModal from './components/LoginModal';
import FloatingChatWidget from './components/FloatingChatWidget';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark } = useTheme();

  // Multi-Page Navigation: 'DASHBOARD' | 'RISK_ENGINE' | 'HELPDESK' | 'MEDICAL_FUNDING'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#risk-engine' || hash === '#ml-risk-engine') return 'RISK_ENGINE';
    if (hash === '#helpdesk' || hash === '#doubts') return 'HELPDESK';
    if (hash === '#fund-supplies' || hash === '#signup' || hash === '#medical-funding' || hash === '#pricing') return 'MEDICAL_FUNDING';
    return 'DASHBOARD';
  });

  const [dashboardTab, setDashboardTab] = useState('ALL');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#risk-engine' || hash === '#ml-risk-engine') setCurrentPage('RISK_ENGINE');
      else if (hash === '#helpdesk' || hash === '#doubts') setCurrentPage('HELPDESK');
      else if (hash === '#fund-supplies' || hash === '#signup' || hash === '#medical-funding' || hash === '#pricing') setCurrentPage('MEDICAL_FUNDING');
      else setCurrentPage('DASHBOARD');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page, tab = 'ALL') => {
    setCurrentPage(page);
    if (page === 'RISK_ENGINE') {
      window.location.hash = 'risk-engine';
    } else if (page === 'HELPDESK') {
      window.location.hash = 'helpdesk';
    } else if (page === 'MEDICAL_FUNDING') {
      window.location.hash = 'fund-supplies';
    } else {
      window.location.hash = 'dashboard';
      if (tab) {
        setDashboardTab(tab);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`app-root ${isDark ? 'dark-mode' : 'light-mode'}`}
      style={{
        minHeight: '100vh',
        backgroundColor: isDark ? '#090d16' : '#f8fafc',
        color: isDark ? '#f8fafc' : '#0f172a',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: 'background-color 0.25s ease, color 0.25s ease'
      }}
    >
      {/* SaaS Top Header Navbar (Matching Oxmaint AI layout from Image 1 & 2) */}
      <SaaSNavbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Main Content Area */}
      <main>
        {currentPage === 'DASHBOARD' && (
          <>
            {/* Landing Hero Section (Matching Image 1) */}
            <LandingHeroSection
              onNavigateToDashboard={() => {
                const el = document.getElementById('dashboard-assessment-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToRiskEngine={() => navigateTo('RISK_ENGINE')}
              onNavigateToFunding={() => navigateTo('MEDICAL_FUNDING')}
              onNavigateToHelpdesk={() => navigateTo('HELPDESK')}
            />

            {/* Anchored Dashboard Operations with Assessment Menu Bar */}
            <div id="dashboard-assessment-section">
              <Dashboard
                initialTab={dashboardTab}
                onNavigateToRiskEngine={() => navigateTo('RISK_ENGINE')}
                onNavigateToHelpdesk={() => navigateTo('HELPDESK')}
                onNavigateToFunding={() => navigateTo('MEDICAL_FUNDING')}
              />
            </div>
          </>
        )}

        {currentPage === 'RISK_ENGINE' && (
          <div style={{ paddingTop: '1rem' }}>
            {/* Breadcrumb back to Dashboard */}
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem 1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: isDark ? '#94a3b8' : '#64748b'
            }}>
              <span
                onClick={() => navigateTo('DASHBOARD')}
                style={{ cursor: 'pointer', color: '#0284c7', fontWeight: 700 }}
              >
                ← Return to Platform Home
              </span>
              <span>/</span>
              <span>ML Route-Level Disruption Risk Engine</span>
            </div>
            <MLRiskEnginePage />
          </div>
        )}

        {currentPage === 'HELPDESK' && (
          <div style={{ paddingTop: '1rem' }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem 1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: isDark ? '#94a3b8' : '#64748b'
            }}>
              <span
                onClick={() => navigateTo('DASHBOARD')}
                style={{ cursor: 'pointer', color: '#0284c7', fontWeight: 700 }}
              >
                ← Return to Platform Home
              </span>
              <span>/</span>
              <span>Doubts & Helpdesk Support</span>
            </div>
            <HelpdeskPage />
          </div>
        )}

        {currentPage === 'MEDICAL_FUNDING' && (
          <div style={{ paddingTop: '1rem' }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem 1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: isDark ? '#94a3b8' : '#64748b'
            }}>
              <span
                onClick={() => navigateTo('DASHBOARD')}
                style={{ cursor: 'pointer', color: '#0284c7', fontWeight: 700 }}
              >
                ← Return to Platform Home
              </span>
              <span>/</span>
              <span>Medical Supplies Relief Sponsorship (Sign Up)</span>
            </div>
            <MedicalSupplyFundingPage />
          </div>
        )}
      </main>

      {/* Login / Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Floating "We're Online!" Chat Widget (Matching both Image 1 & Image 2) */}
      <FloatingChatWidget
        onNavigateToHelpdesk={() => navigateTo('HELPDESK')}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
