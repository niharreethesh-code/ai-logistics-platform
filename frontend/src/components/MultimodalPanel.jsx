import React, { useState } from 'react';

const MultimodalPanel = ({ modes = [], activeMode, onSelectMode }) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const defaultModes = [
    {
      id: 'road',
      name: 'All-Terrain Road',
      category: 'Surface Ground',
      icon: '🚚',
      avgSpeedKmh: 45,
      payloadCapacityKg: '12,000 kg',
      costPerKmKg: '₹0.28',
      carbonGPerTonneKm: 165,
      resilienceScore: 54,
      status: 'Restricted in monsoon zones'
    },
    {
      id: 'rail',
      name: 'Mountain Feeder Rail',
      category: 'Surface Rail',
      icon: '🚂',
      avgSpeedKmh: 65,
      payloadCapacityKg: '850,000 kg',
      costPerKmKg: '₹0.08',
      carbonGPerTonneKm: 32,
      resilienceScore: 78,
      status: 'High bulk efficiency'
    },
    {
      id: 'waterway',
      name: 'Inland River Barge',
      category: 'Waterway',
      icon: '⛴️',
      avgSpeedKmh: 24,
      payloadCapacityKg: '65,000 kg',
      costPerKmKg: '₹0.06',
      carbonGPerTonneKm: 24,
      resilienceScore: 82,
      status: 'Immune to road landslides'
    },
    {
      id: 'drone',
      name: 'Heavy-Lift Cargo UAV',
      category: 'Air Dispatch',
      icon: '🛸',
      avgSpeedKmh: 95,
      payloadCapacityKg: '150 kg',
      costPerKmKg: '₹0.75',
      carbonGPerTonneKm: 18,
      resilienceScore: 92,
      status: 'Zero ground terrain risk'
    }
  ];

  const displayModes = modes.length > 0 ? modes : defaultModes;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔄</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Objective 01: Unified Multi-Modal Transport Model
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Integrated data fusion across Road, Rail, Waterway & Air/Drone logistics channels
          </span>
        </div>

        <button
          onClick={() => setShowImagePreview(!showImagePreview)}
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🖼️ {showImagePreview ? 'Hide Ops Visual' : 'View Multimodal Ops Center'}
        </button>
      </div>

      {/* Visual Image Preview when expanded */}
      {showImagePreview && (
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '1.25rem',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          maxHeight: '360px'
        }}>
          <img
            src="/images/multimodal_ops.jpg"
            alt="Multimodal Logistics Operations Center"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 16px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(8, 12, 20, 0.9) 100%)',
            fontSize: '0.8rem',
            color: '#cbd5e1'
          }}>
            🛰️ <strong style={{ color: '#38bdf8' }}>AI Logistics Ops Center:</strong> Autonomous heavy-duty truck, freight river barge, mountain railway & heavy-lift cargo drone network.
          </div>
        </div>
      )}

      {/* Grid of 4 Multimodal Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem'
      }}>
        {displayModes.map((m) => {
          const isSelected = activeMode === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelectMode && onSelectMode(m.id)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.7)',
                border: `1px solid ${isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.25)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{m.icon}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: isSelected ? '#38bdf8' : 'rgba(255,255,255,0.06)',
                  color: isSelected ? '#0f172a' : '#94a3b8'
                }}>
                  {m.category}
                </span>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                {m.name}
              </div>

              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                {m.status}
              </div>

              {/* Specs */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '0.75rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                color: '#cbd5e1'
              }}>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem' }}>SPEED</span>
                  <strong>{m.avgSpeedKmh} km/h</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem' }}>CAPACITY</span>
                  <strong>{m.payloadCapacityKg}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem' }}>COST / KG-KM</span>
                  <strong style={{ color: '#38bdf8' }}>{m.costPerKmKg}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.68rem' }}>RESILIENCE</span>
                  <strong style={{ color: m.resilienceScore > 75 ? '#10b981' : '#f59e0b' }}>
                    {m.resilienceScore}%
                  </strong>
                </div>
              </div>

              <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: isSelected ? '#38bdf8' : '#64748b'
                }}>
                  {isSelected ? '✓ Active Mode' : 'Click to select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultimodalPanel;
