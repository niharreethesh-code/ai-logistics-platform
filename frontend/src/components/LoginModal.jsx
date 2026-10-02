import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const { isDark } = useTheme();
  const [role, setRole] = useState('COORDINATOR'); // 'COORDINATOR' | 'DONOR' | 'DISASTER_OFFICER'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email: email || 'guest.planner@ailogix.org',
        role,
        name: role === 'COORDINATOR' ? 'Dr. Sarah Mitchell' : role === 'DONOR' ? 'Global Health Foundation' : 'Inspector R. Sen (NDRF)'
      });
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (demoRole) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        email: demoRole === 'COORDINATOR' ? 'coordinator@ailogix.org' : 'relief.sponsor@unicef.org',
        role: demoRole,
        name: demoRole === 'COORDINATOR' ? 'Commander Arun Joshi (Disaster Cell)' : 'Priya Sharma (Humanitarian Aid)'
      });
      onClose();
    }, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(460px, 95vw)',
          background: isDark ? '#0f172a' : '#ffffff',
          borderRadius: '20px',
          border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 25px rgba(56, 189, 248, 0.15)'
            : '0 20px 40px -10px rgba(15, 23, 42, 0.2)',
          padding: '28px',
          color: isDark ? '#f8fafc' : '#020617',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
            border: 'none',
            color: isDark ? '#94a3b8' : '#475569',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 800
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.6rem' }}>🛰️</span>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Sign In to <span style={{ color: '#0284c7' }}>AI-LOGIX</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: isDark ? '#94a3b8' : '#64748b' }}>
              National Emergency & Multi-Modal Relief Operations
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#f1f5f9',
          padding: '4px',
          borderRadius: '10px',
          margin: '18px 0 16px 0',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'}`
        }}>
          {[
            { id: 'COORDINATOR', label: 'Planner' },
            { id: 'DONOR', label: 'Relief Donor' },
            { id: 'DISASTER_OFFICER', label: 'Agency NDRF' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRole(tab.id)}
              style={{
                background: role === tab.id ? '#0284c7' : 'transparent',
                color: role === tab.id ? '#ffffff' : isDark ? '#94a3b8' : '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 4px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px' }}>
              Official Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. logistics.lead@relief.gov.in"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1.5px solid ${isDark ? 'rgba(79, 110, 165, 0.4)' : '#cbd5e1'}`,
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                color: isDark ? '#f8fafc' : '#020617',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px' }}>
              Terminal Access Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1.5px solid ${isDark ? 'rgba(79, 110, 165, 0.4)' : '#cbd5e1'}`,
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
                color: isDark ? '#f8fafc' : '#020617',
                fontSize: '0.85rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '11px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Operations Console →'}
          </button>
        </form>

        {/* Quick Demo Access (Making it easy and feasible) */}
        <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}` }}>
          <div style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#64748b', textAlign: 'center', marginBottom: '8px', fontWeight: 600 }}>
            Instant Evaluation Access (No password required)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('COORDINATOR')}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
                color: isDark ? '#38bdf8' : '#0369a1',
                border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : '#bae6fd'}`,
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ⚡ 1-Click Planner Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('DONOR')}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                background: isDark ? 'rgba(16, 185, 129, 0.12)' : '#d1fae5',
                color: isDark ? '#34d399' : '#047857',
                border: `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : '#a7f3d0'}`,
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ❤️ 1-Click Donor Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
