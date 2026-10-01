import React, { useState } from 'react';

const CaseStudySelector = ({ corridors = [], selectedCorridor, onSelectCorridor }) => {
  const [showImageComparison, setShowImageComparison] = useState(false);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏔️</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Objective 06: Case-Study Corridors in Contrasting Region Types
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Empirical validation across High Alpine Mountain Passes, Riverine Delta Cutoffs, and Arid Desert Frontiers
          </span>
        </div>

        <button
          onClick={() => setShowImageComparison(!showImageComparison)}
          style={{
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc',
            borderRadius: '8px',
            padding: '6px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          📊 {showImageComparison ? 'Hide Terrain Comparison' : 'View Contrasting GIS Corridors'}
        </button>
      </div>

      {/* Visual Image Preview when expanded */}
      {showImageComparison && (
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          maxHeight: '380px'
        }}>
          <img
            src="/images/corridors_case_study.jpg"
            alt="Himalayan Mountain Corridor vs Tropical Riverine Delta Corridor"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 16px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(8, 12, 20, 0.95) 100%)',
            fontSize: '0.8rem',
            color: '#cbd5e1'
          }}>
            🛰️ <strong style={{ color: '#818cf8' }}>Case-Study Validation:</strong> Left: High Alpine Himalayan Mountain Pass (Elev 5,400m, Landslides/Avalanche) | Right: Riverine Delta Corridor (Elev 8m, Waterway dominance).
          </div>
        </div>
      )}

      {/* Corridor Selection Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {corridors.map((c) => {
          const isSelected = selectedCorridor?.id === c.id;
          return (
            <div
              key={c.id}
              onClick={() => onSelectCorridor && onSelectCorridor(c)}
              style={{
                background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${isSelected ? '#818cf8' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '12px',
                padding: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 0 20px rgba(99, 102, 241, 0.25)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: isSelected ? '#818cf8' : 'rgba(255,255,255,0.06)',
                  color: isSelected ? '#0f172a' : '#94a3b8'
                }}>
                  {c.elevationRange}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: c.feasibilityScore < 50 ? '#f43f5e' : c.feasibilityScore < 70 ? '#f59e0b' : '#10b981'
                }}>
                  Feasibility: {c.feasibilityScore}/100
                </span>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                {c.name}
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {c.regionType}
              </div>

              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <span style={{ color: '#818cf8', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  AI Preferred Mode:
                </span>
                <span style={{ color: '#f1f5f9' }}>{c.activeModeRecommendation}</span>
              </div>

              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {c.primaryHazards.map((h, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      color: '#fda4af',
                      border: '1px solid rgba(244, 63, 94, 0.2)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.68rem'
                    }}
                  >
                    ⚠️ {h}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: isSelected ? '#818cf8' : '#64748b'
                }}>
                  {isSelected ? '✓ Loaded into Command Center' : 'Click to load corridor'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseStudySelector;
