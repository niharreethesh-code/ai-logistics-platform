import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 14px',
        borderRadius: '10px',
        background: isDark
          ? 'rgba(30, 41, 59, 0.85)'
          : 'rgba(255, 255, 255, 0.95)',
        border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(203, 213, 225, 0.9)'}`,
        color: isDark ? '#f8fafc' : '#0f172a',
        cursor: 'pointer',
        fontSize: '0.82rem',
        fontWeight: 600,
        boxShadow: isDark
          ? '0 2px 8px rgba(0, 0, 0, 0.35)'
          : '0 2px 8px rgba(15, 23, 42, 0.08)',
        transition: 'all 0.25s ease',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.borderColor = isDark ? '#38bdf8' : '#0284c7';
        e.currentTarget.style.boxShadow = isDark
          ? '0 4px 14px rgba(56, 189, 248, 0.25)'
          : '0 4px 14px rgba(2, 132, 199, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(203, 213, 225, 0.9)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 2px 8px rgba(0, 0, 0, 0.35)'
          : '0 2px 8px rgba(15, 23, 42, 0.08)';
      }}
    >
      {/* Icon Pill */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: isDark
            ? 'rgba(56, 189, 248, 0.15)'
            : 'rgba(245, 158, 11, 0.15)',
          fontSize: '0.95rem',
          transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)',
          transition: 'transform 0.4s ease, background-color 0.25s ease'
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>

      {/* Label */}
      <span style={{ letterSpacing: '-0.01em' }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
