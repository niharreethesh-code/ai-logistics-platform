import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <Dashboard />
    </div>
  );
}

export default App;
