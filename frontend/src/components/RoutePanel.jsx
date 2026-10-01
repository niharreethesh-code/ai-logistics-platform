import React, { useState } from 'react';

const RoutePanel = ({ routes = [], onOptimize }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimizeClick = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      if (onOptimize) onOptimize();
    }, 800);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🧭</span>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
            Active Route Matrix
          </h3>
        </div>
        <button
          onClick={handleOptimizeClick}
          disabled={isOptimizing}
          className="glow-btn-cyan"
          style={{
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: isOptimizing ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {isOptimizing ? '🔄 Computing...' : '⚡ Optimize All'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {routes.map((route) => {
          const isTransit = route.status === 'In Transit';
          return (
            <div
              key={route.id}
              style={{
                background: 'rgba(15, 23, 42, 0.65)',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: `1px solid ${isTransit ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.85rem', color: isTransit ? '#38bdf8' : '#94a3b8' }}>●</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f1f5f9' }}>{route.name}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '3px', display: 'flex', gap: '8px' }}>
                  <span>{route.totalStops} Waypoints</span>
                  <span>•</span>
                  <span>ETA: {route.estimatedDuration}</span>
                </div>
              </div>

              <span style={{
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: isTransit ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                color: isTransit ? '#38bdf8' : '#94a3b8',
                border: `1px solid ${isTransit ? 'rgba(56, 189, 248, 0.3)' : 'transparent'}`
              }}>
                {route.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoutePanel;
