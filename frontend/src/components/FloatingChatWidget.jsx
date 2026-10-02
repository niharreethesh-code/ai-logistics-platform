import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const FloatingChatWidget = ({ onNavigateToHelpdesk }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Hello! I am the AI-Logix Operations Assistant. How can I help you today with route planning, ML risk prediction, or medical relief funding?'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');

    // Instant helpful answer
    setTimeout(() => {
      let reply = 'Our AI platform coordinates multi-modal routing across roads, railways, river barges, and cargo drones. You can test route-level risk in the ML Disruption Risk Engine or sponsor emergency kits in the Relief Funding page.';
      const lower = userText.toLowerCase();
      if (lower.includes('risk') || lower.includes('ml')) {
        reply = 'Objective 02 utilizes supervised ensemble regression (Random Forest + Gradient Boosting) analyzing terrain slope, rainfall (>35 mm/h), and soil moisture to predict cutoffs.';
      } else if (lower.includes('drone') || lower.includes('uav')) {
        reply = 'Cargo drones fly up to 85 km/h with 50–150 kg payloads, bypassing blocked mountain passes and severed bridges to deliver antivenom, insulin, and trauma kits directly.';
      } else if (lower.includes('fund') || lower.includes('donate') || lower.includes('money')) {
        reply = 'You can fund emergency trauma packs (₹2,500), cold-chain antivenom pods (₹7,500), or a full cargo UAV flight (₹35,000) with instant dispatch tracking on the Relief Funding page!';
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1100 }}>
      {/* Expanded Quick Chat Popover */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: 0,
            width: 'min(360px, 90vw)',
            background: isDark ? '#0f172a' : '#ffffff',
            borderRadius: '16px',
            border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.4)' : '#cbd5e1'}`,
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInSlideUp 0.2s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            background: '#0284c7',
            padding: '12px 16px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>💬</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>AI-Logix Help Desk</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>Live Response • All 6 Objectives</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 800
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '8px 12px',
                  borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.sender === 'user' ? '#0284c7' : isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9',
                  color: m.sender === 'user' ? '#ffffff' : isDark ? '#f8fafc' : '#0f172a',
                  fontSize: '0.8rem',
                  lineHeight: 1.4
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick FAQ Tags */}
          <div style={{
            display: 'flex',
            gap: '6px',
            padding: '4px 12px 8px 12px',
            overflowX: 'auto',
            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'}`
          }}>
            {[
              'How does ML predict risk?',
              'How to sponsor UAV flight?',
              'What is Objective 03?'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
                  color: isDark ? '#38bdf8' : '#0369a1',
                  border: 'none',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input and Send */}
          <form
            onSubmit={handleSend}
            style={{
              display: 'flex',
              padding: '8px 12px',
              borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
              background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff'
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a doubt or question..."
              style={{
                flex: 1,
                padding: '7px 10px',
                borderRadius: '6px',
                border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.4)' : '#cbd5e1'}`,
                background: isDark ? '#090d16' : '#ffffff',
                color: isDark ? '#f8fafc' : '#020617',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: '6px',
                padding: '0 12px',
                borderRadius: '6px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>

          {/* Footer jump to full Helpdesk */}
          <div style={{
            padding: '6px 12px',
            background: isDark ? '#090d16' : '#f8fafc',
            textAlign: 'center',
            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : '#f1f5f9'}`
          }}>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onNavigateToHelpdesk();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0284c7',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Open Full Doubts Helpdesk & Question Forum →
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Button (Styled like "We're Online!" in Screenshots) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#0052cc',
          color: '#ffffff',
          border: 'none',
          borderRadius: '24px 24px 4px 24px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 82, 204, 0.45)',
          fontSize: '0.85rem',
          fontWeight: 800,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 82, 204, 0.55)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 82, 204, 0.45)';
        }}
      >
        <span style={{ fontSize: '1rem' }}>💬</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
          <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Need Help?</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>We're Online!</span>
        </div>
      </button>
    </div>
  );
};

export default FloatingChatWidget;
