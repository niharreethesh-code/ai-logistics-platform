import React from 'react';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContainer() {
  const { isDark } = useTheme();

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
      <Dashboard />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;
