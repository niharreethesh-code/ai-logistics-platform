import React, { useState } from 'react';

const MapView = ({ villages = [], selectedVillage, onSelectVillage, routes = [] }) => {
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [showWeather, setShowWeather] = useState(true);
  const [hoveredVillage, setHoveredVillage] = useState(null);

  const filteredVillages = villages.filter(v => {
    if (filterRisk === 'ALL') return true;
    return v.riskStatus.toUpperCase() === filterRisk;
  });

  // Coordinates mapping to SVG viewport (800x480)
  // Let's create aesthetic positions for villages on the map canvas
  const villagePositions = {
    v1: { x: 260, y: 190, name: 'Rampur' },
    v2: { x: 530, y: 140, name: 'Chandrapur' },
    v3: { x: 380, y: 340, name: 'Shitalpur' },
    v4: { x: 670, y: 280, name: 'Dharampur' },
    v5: { x: 150, y: 320, name: 'Kishanpur' }
  };

  const getPos = (id) => villagePositions[id] || { x: 400, y: 240, name: id };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Dynamic Geospatial Operations Map
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Real-time elevation mapping • Multi-modal routing • Live telemetry
          </span>
        </div>

        {/* Map Layers & Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '2px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {['ALL', 'LOW', 'MODERATE', 'HIGH'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterRisk(status)}
                style={{
                  background: filterRisk === status ? '#38bdf8' : 'transparent',
                  color: filterRisk === status ? '#0f172a' : '#94a3b8',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowWeather(!showWeather)}
            style={{
              background: showWeather ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.8)',
              color: showWeather ? '#38bdf8' : '#94a3b8',
              border: `1px solid ${showWeather ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255,255,255,0.08)'}`,
              padding: '5px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🌧️ Weather Layer {showWeather ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #09101d 0%, #060911 100%)',
        border: '1px solid rgba(56, 189, 248, 0.15)'
      }}>
        {/* Subtle Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6
        }}></div>

        <svg viewBox="0 0 800 480" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <radialGradient id="highRiskHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 63, 94, 0.4)" />
              <stop offset="100%" stopColor="rgba(244, 63, 94, 0)" />
            </radialGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Topography Contours */}
          <path d="M 50 120 Q 180 80 320 130 T 600 90 T 780 150" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1.5" />
          <path d="M 30 220 Q 220 180 400 240 T 720 200" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1.5" />
          <path d="M 80 350 Q 260 290 480 370 T 750 330" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1.5" />
          <path d="M 120 440 Q 340 380 560 420 T 780 400" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1.5" />

          {/* Elevation Hills (Shaded Terrain) */}
          <path d="M 450 180 Q 530 110 610 180 Z" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(56, 189, 248, 0.1)" />
          <path d="M 300 370 Q 380 290 460 370 Z" fill="rgba(30, 41, 59, 0.4)" stroke="rgba(56, 189, 248, 0.1)" />

          {/* Simulated Weather Radar Storm Cells */}
          {showWeather && (
            <g opacity="0.65">
              <ellipse cx="380" cy="330" rx="90" ry="60" fill="radial-gradient(rgba(244, 63, 94, 0.25), transparent)" />
              <path d="M 340 310 Q 380 290 420 310 Q 400 350 340 310 Z" fill="rgba(244, 63, 94, 0.18)" />
              <text x="345" y="295" fill="#f43f5e" fontSize="10" fontWeight="600" letterSpacing="0.5">⚠️ FLASH FLOOD ZONE</text>
            </g>
          )}

          {/* Active Delivery Route Lines */}
          <path
            d="M 260 190 Q 390 120 530 140 Q 460 250 380 340"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            className="route-flowing-line"
            filter="url(#glow)"
          />

          <path
            d="M 260 190 Q 190 260 150 320"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.7"
          />

          {/* Moving Delivery Vehicle Telemetry */}
          <g transform="translate(420, 160)" style={{ animation: 'floatTruck 2s ease-in-out infinite' }}>
            <circle cx="0" cy="0" r="14" fill="rgba(56, 189, 248, 0.2)" />
            <circle cx="0" cy="0" r="8" fill="#38bdf8" />
            <text x="12" y="4" fill="#38bdf8" fontSize="11" fontWeight="700">🚚 TRUCK-01 (In Transit)</text>
          </g>

          {/* Village Nodes */}
          {filteredVillages.map((v) => {
            const pos = getPos(v.id);
            const isSelected = selectedVillage?.id === v.id;
            const isHighRisk = v.riskStatus === 'High';
            const isModRisk = v.riskStatus === 'Moderate';
            const color = isHighRisk ? '#f43f5e' : isModRisk ? '#f59e0b' : '#10b981';

            return (
              <g
                key={v.id}
                style={{ cursor: 'pointer' }}
                onClick={() => onSelectVillage && onSelectVillage(v)}
                onMouseEnter={() => setHoveredVillage(v)}
                onMouseLeave={() => setHoveredVillage(null)}
              >
                {/* Outer Pulsing Halo */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 22 : 16}
                  fill={isHighRisk ? 'rgba(244, 63, 94, 0.25)' : 'rgba(56, 189, 248, 0.15)'}
                  className="glow-pin"
                />

                {/* Node Center */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 9 : 6}
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter="url(#glow)"
                />

                {/* Village Label Badge */}
                <rect
                  x={pos.x - 38}
                  y={pos.y + 12}
                  width="76"
                  height="20"
                  rx="6"
                  fill="rgba(15, 23, 42, 0.9)"
                  stroke={isSelected ? '#38bdf8' : 'rgba(255,255,255,0.1)'}
                  strokeWidth="1"
                />
                <text
                  x={pos.x}
                  y={pos.y + 26}
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize="10"
                  fontWeight="600"
                >
                  {v.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Selected Village Quick Tooltip */}
        {(hoveredVillage || selectedVillage) && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>Target Location</span>
              <strong style={{ color: '#f8fafc' }}>{(hoveredVillage || selectedVillage).name}</strong>
            </div>
            <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>Accessibility</span>
              <strong style={{ color: '#38bdf8' }}>{(hoveredVillage || selectedVillage).accessScore}%</strong>
            </div>
            <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>Terrain</span>
              <strong style={{ color: '#cbd5e1' }}>{(hoveredVillage || selectedVillage).terrain}</strong>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '0.75rem',
          display: 'flex',
          gap: '12px',
          color: '#94a3b8'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Low
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Moderate
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></span> Severe
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
