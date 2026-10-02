import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import MLRiskEnginePage from './pages/MLRiskEnginePage';
import HelpdeskPage from './pages/HelpdeskPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const { isDark } = useTheme();

  // Three-Way Page Navigation: 'DASHBOARD' | 'RISK_ENGINE' | 'HELPDESK'
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#risk-engine' || hash === '#ml-risk-engine') return 'RISK_ENGINE';
    if (hash === '#helpdesk' || hash === '#doubts') return 'HELPDESK';
    return 'DASHBOARD';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#risk-engine' || hash === '#ml-risk-engine') setCurrentPage('RISK_ENGINE');
      else if (hash === '#helpdesk' || hash === '#doubts') setCurrentPage('HELPDESK');
      else setCurrentPage('DASHBOARD');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === 'RISK_ENGINE') window.location.hash = 'risk-engine';
    else if (page === 'HELPDESK') window.location.hash = 'helpdesk';
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
      {/* Top 3-Way Global Navigation Bar */}
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
        {/* Logo and Academic Attribution */}
        <div
          onClick={() => navigateTo('DASHBOARD')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1.4rem' }}>🛰️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: isDark ? '#f8fafc' : '#0f172a' }}>
              AI-LOGIX <span style={{ color: '#38bdf8' }}>PLATFORM</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', lineHeight: 1 }}>
              NCET CSE (22CSP57) • Rural Connectivity & Disaster Relief
            </div>
          </div>
        </div>

        {/* The 3-Way Main Navigation Controls */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(241, 245, 249, 0.9)',
          padding: '4px',
          borderRadius: '12px',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(203, 213, 225, 0.8)'}`
        }}>
          <button
            onClick={() => navigateTo('DASHBOARD')}
            style={{
              background: currentPage === 'DASHBOARD' ? '#0284c7' : 'transparent',
              color: currentPage === 'DASHBOARD' ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
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
            <span>1. Unified Dashboard (All 6 Objectives)</span>
          </button>

          <button
            onClick={() => navigateTo('RISK_ENGINE')}
            style={{
              background: currentPage === 'RISK_ENGINE' ? '#0284c7' : 'transparent',
              color: currentPage === 'RISK_ENGINE' ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
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
              padding: '8px 16px',
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
        </div>

        {/* Top Right Controls (Theme Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ThemeToggle />
        </div>
      </nav>

      {/* Render Active View from the 3-Way Pages */}
      <main>
        {currentPage === 'DASHBOARD' && (
          <Dashboard
            onNavigateToRiskEngine={() => navigateTo('RISK_ENGINE')}
            onNavigateToHelpdesk={() => navigateTo('HELPDESK')}
          />
        )}
        {currentPage === 'RISK_ENGINE' && <MLRiskEnginePage />}
        {currentPage === 'HELPDESK' && <HelpdeskPage />}
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
