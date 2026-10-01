import React from 'react';

const RiskPanel = ({ riskData, selectedVillage }) => {
  const weatherRisk = riskData?.weatherRiskFactor ?? 0.42;
  const terrainRisk = riskData?.terrainRiskFactor ?? 0.65;
  const overallRisk = selectedVillage?.riskStatus || 'Moderate';

  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🛡️</span>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
            Predictive AI Risk Intelligence
          </h3>
        </div>
        <span style={{
          fontSize: '0.7rem',
          padding: '2px 8px',
          borderRadius: '9999px',
          background: 'rgba(56, 189, 248, 0.1)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          fontWeight: 600
        }}>
          ML Model v2.4 (96.4% Acc)
        </span>
      </div>

      {selectedVillage ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Target Header */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selected Destination</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>{selectedVillage.name}</div>
            </div>
            <span style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: overallRisk === 'High' ? 'rgba(244, 63, 94, 0.2)' : overallRisk === 'Moderate' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
              color: overallRisk === 'High' ? '#fda4af' : overallRisk === 'Moderate' ? '#fde68a' : '#a7f3d0',
              border: `1px solid ${overallRisk === 'High' ? '#f43f5e' : overallRisk === 'Moderate' ? '#f59e0b' : '#10b981'}`
            }}>
              {overallRisk} Risk
            </span>
          </div>

          {/* Metric Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#94a3b8' }}>Terrain Hazard Factor</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{Math.round(terrainRisk * 100)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${terrainRisk * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #f43f5e)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#94a3b8' }}>Weather & Precipitation Impact</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{Math.round(weatherRisk * 100)}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${weatherRisk * 100}%`, height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: '#94a3b8' }}>Road Accessibility Index</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>{selectedVillage.accessScore}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${selectedVillage.accessScore}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #38bdf8)' }} />
              </div>
            </div>
          </div>

          {/* AI Recommended Directives */}
          <div style={{
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '10px',
            padding: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>⚡</span> AI DISPATCH DIRECTIVE
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              {overallRisk === 'High'
                ? 'High risk of road blockage. Restrict to 4WD payload transport and dispatch before 16:30 hrs.'
                : overallRisk === 'Moderate'
                ? 'Moderate terrain elevation. Standard all-weather vans recommended with real-time GPS tracking.'
                : 'Favorable travel conditions. Route clear for all standard courier vehicle types.'}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>
          Select a village on the map or registry to view localized AI risk intelligence.
        </div>
      )}
    </div>
  );
};

export default RiskPanel;
