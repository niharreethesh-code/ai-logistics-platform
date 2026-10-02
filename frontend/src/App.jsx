import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import MLRiskEnginePage from './pages/MLRiskEnginePage';
import HelpdeskPage from './pages/HelpdeskPage';
import MedicalSupplyFundingPage from './pages/MedicalSupplyFundingPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const { isDark } = useTheme();

  // Multi-Page Navigation: 'DASHBOARD' | 'RISK_ENGINE' | 'HELPDESK' | 'MEDICAL_FUNDING'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#risk-engine' || hash === '#ml-risk-engine') return 'RISK_ENGINE';
    if (hash === '#helpdesk' || hash === '#doubts') return 'HELPDESK';
    if (hash === '#fund-supplies' || hash === '#signup' || hash === '#medical-funding') return 'MEDICAL_FUNDING';
    return 'DASHBOARD';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#risk-engine' || hash === '#ml-risk-engine') setCurrentPage('RISK_ENGINE');
      else if (hash === '#helpdesk' || hash === '#doubts') setCurrentPage('HELPDESK');
      else if (hash === '#fund-supplies' || hash === '#signup' || hash === '#medical-funding') setCurrentPage('MEDICAL_FUNDING');
      else setCurrentPage('DASHBOARD');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'RISK_ENGINE') window.location.hash = 'risk-engine';
    else if (page === 'HELPDESK') window.location.hash = 'helpdesk';
    else if (page === 'MEDICAL_FUNDING') window.location.hash = 'fund-supplies';
    else window.location.hash = 'dashboard';
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
      {/* Top Main Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: isDark ? 'rgba(9, 13, 22, 0.88)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.2)' : 'rgba(203, 213, 225, 0.8)'}`,
        padding: '0.65rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.4)' : '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Logo and Platform Title */}
        <div
          onClick={() => navigateTo('DASHBOARD')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1.4rem' }}>🛰️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: isDark ? '#f8fafc' : '#0f172a' }}>
              AI-LOGIX <span style={{ color: '#38bdf8' }}>PLATFORM</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#334155', lineHeight: 1, fontWeight: 600 }}>
              AI-LOGIX Enterprise • National Rural Connectivity & Emergency Relief Grid
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(241, 245, 249, 0.9)',
          padding: '4px',
          borderRadius: '12px',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(203, 213, 225, 0.8)'}`,
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigateTo('DASHBOARD')}
            style={{
              background: currentPage === 'DASHBOARD' ? '#0284c7' : 'transparent',
              color: currentPage === 'DASHBOARD' ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: currentPage === 'DASHBOARD' ? '0 2px 10px rgba(2, 132, 199, 0.4)' : 'none'
            }}
          >
            <span>📊</span>
            <span>1. Dashboard (All 6 Objectives)</span>
          </button>

          <button
            onClick={() => navigateTo('RISK_ENGINE')}
            style={{
              background: currentPage === 'RISK_ENGINE' ? '#0284c7' : 'transparent',
              color: currentPage === 'RISK_ENGINE' ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: currentPage === 'RISK_ENGINE' ? '0 2px 10px rgba(2, 132, 199, 0.4)' : 'none'
            }}
          >
            <span>🧠</span>
            <span>2. ML Disruption Risk Engine</span>
          </button>

          <button
            onClick={() => navigateTo('HELPDESK')}
            style={{
              background: currentPage === 'HELPDESK' ? '#0284c7' : 'transparent',
              color: currentPage === 'HELPDESK' ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: currentPage === 'HELPDESK' ? '0 2px 10px rgba(2, 132, 199, 0.4)' : 'none'
            }}
          >
            <span>💬</span>
            <span>3. Helpdesk & Doubts</span>
          </button>

          <button
            onClick={() => navigateTo('MEDICAL_FUNDING')}
            style={{
              background: currentPage === 'MEDICAL_FUNDING' ? '#059669' : 'rgba(16, 185, 129, 0.12)',
              color: currentPage === 'MEDICAL_FUNDING' ? '#ffffff' : isDark ? '#34d399' : '#047857',
              border: `1.5px solid ${currentPage === 'MEDICAL_FUNDING' ? '#10b981' : 'rgba(16, 185, 129, 0.45)'}`,
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
              boxShadow: currentPage === 'MEDICAL_FUNDING' ? '0 2px 14px rgba(16, 185, 129, 0.45)' : 'none'
            }}
          >
            <span>❤️</span>
            <span>4. Fund Medical Supplies (Sign Up)</span>
          </button>
        </div>

        {/* Top Right Controls (Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle />
        </div>
      </nav>

      {/* Render Active View */}
      <main>
        {currentPage === 'DASHBOARD' && (
          <Dashboard
            onNavigateToRiskEngine={() => navigateTo('RISK_ENGINE')}
            onNavigateToHelpdesk={() => navigateTo('HELPDESK')}
            onNavigateToFunding={() => navigateTo('MEDICAL_FUNDING')}
          />
        )}
        {currentPage === 'RISK_ENGINE' && <MLRiskEnginePage />}
        {currentPage === 'HELPDESK' && <HelpdeskPage />}
        {currentPage === 'MEDICAL_FUNDING' && <MedicalSupplyFundingPage />}
      </main>
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
