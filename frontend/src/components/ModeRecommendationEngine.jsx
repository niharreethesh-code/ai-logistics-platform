import React, { useState } from 'react';
import { recommendMode } from '../services/api';

const ModeRecommendationEngine = ({ onSelectMode }) => {
  const [weatherCondition, setWeatherCondition] = useState('Landslide Alert');
  const [terrainType, setTerrainType] = useState('Alpine Pass');
  const [urgencyLevel, setUrgencyLevel] = useState('Emergency SOS');
  const [payloadWeightKg, setPayloadWeightKg] = useState(65);
  const [isComputing, setIsComputing] = useState(false);
  const [recommendation, setRecommendation] = useState({
    modeId: 'drone',
    modeName: 'Autonomous Cargo Drone (UAV)',
    icon: '🛸',
    confidenceScore: 0.96,
    riskMitigationPct: 82,
    estimatedDuration: '1h 15m',
    costPerKg: '₹0.75',
    carbonGPerTonneKm: 18,
    rationale: 'Road passes are blocked by severe landslide alert. UAV air-corridor completely bypasses ground terrain blockades for time-critical relief cargo under 150 kg.',
    fallbackProtocol: 'If wind velocity exceeds 50 km/h, automatically divert cargo to 6x6 Off-Road Convoy via South Foothill bypass route.'
  });

  const handleComputeRecommendation = async () => {
    setIsComputing(true);
    try {
      const res = await recommendMode({
        weatherCondition,
        terrainType,
        urgencyLevel,
        payloadWeightKg
      });

      if (res && res.success && res.recommendation) {
        const modeId = res.recommendation.modeId;
        const modeMap = {
          drone: { name: 'Autonomous Cargo Drone (UAV)', icon: '🛸', cost: '₹0.75', carbon: 18, riskMit: 84 },
          road: { name: 'All-Terrain 4WD Ground Truck', icon: '🚚', cost: '₹0.28', carbon: 165, riskMit: 48 },
          waterway: { name: 'Inland River Freight Barge', icon: '⛴️', cost: '₹0.06', carbon: 24, riskMit: 76 },
          rail: { name: 'Feeder Mountain Rail', icon: '🚂', cost: '₹0.08', carbon: 32, riskMit: 70 }
        };
        const mInfo = modeMap[modeId] || modeMap.drone;

        setRecommendation({
          modeId,
          modeName: mInfo.name,
          icon: mInfo.icon,
          confidenceScore: res.recommendation.confidenceScore || 0.94,
          riskMitigationPct: mInfo.riskMit,
          estimatedDuration: `${res.recommendation.estimatedHours}h 00m`,
          costPerKg: mInfo.cost,
          carbonGPerTonneKm: mInfo.carbon,
          rationale: res.recommendation.rationale,
          fallbackProtocol: modeId === 'drone'
            ? 'If wind velocity exceeds 50 km/h, divert to 6x6 Off-Road Convoy via South Foothill bypass.'
            : 'If water levels drop below navigation draft, transfer cargo to feeder rail terminal.'
        });

        if (onSelectMode) onSelectMode(modeId);
      }
    } catch (e) {
      console.warn('Recommendation API offline, using smart local rule engine:', e);
      // Fallback local rule-based heuristic
      let chosen = 'road';
      let rRationale = 'Clear weather and stable road pass index. Standard 4WD transport provides lowest transit cost.';
      let rHours = '4h 30m';
      let rMit = 52;
      let rCost = '₹0.28';
      let rCarbon = 165;
      let rIcon = '🚚';
      let rName = 'All-Terrain 4WD Ground Truck';

      if (weatherCondition === 'Landslide Alert' || weatherCondition === 'Heavy Monsoon Rain') {
        if (payloadWeightKg <= 150) {
          chosen = 'drone';
          rRationale = 'Severe ground obstacle active. Octocopter UAV recommended for zero-ground obstacle traversal.';
          rHours = '1h 15m';
          rMit = 86;
          rCost = '₹0.75';
          rCarbon = 18;
          rIcon = '🛸';
          rName = 'Autonomous Cargo Drone (UAV)';
        } else if (terrainType === 'Riverine Delta Basin') {
          chosen = 'waterway';
          rRationale = 'Roads inundated. Shallow-draft cargo barge provides reliable high-capacity transit.';
          rHours = '5h 10m';
          rMit = 74;
          rCost = '₹0.06';
          rCarbon = 24;
          rIcon = '⛴️';
          rName = 'Inland River Freight Barge';
        } else {
          chosen = 'rail';
          rRationale = 'Heavy payload exceeds UAV limit. Fortified mountain rail tunnel bypasses landslide surface slopes.';
          rHours = '3h 40m';
          rMit = 68;
          rCost = '₹0.08';
          rCarbon = 32;
          rIcon = '🚂';
          rName = 'Feeder Mountain Rail';
        }
      }

      setRecommendation({
        modeId: chosen,
        modeName: rName,
        icon: rIcon,
        confidenceScore: 0.95,
        riskMitigationPct: rMit,
        estimatedDuration: rHours,
        costPerKg: rCost,
        carbonGPerTonneKm: rCarbon,
        rationale: rRationale,
        fallbackProtocol: chosen === 'drone'
          ? 'Ground emergency team placed on standby at nearest roadhead staging depot.'
          : 'Air dispatch UAV held in reserve for high-priority medical supplies.'
      });
      if (onSelectMode) onSelectMode(chosen);
    } finally {
      setTimeout(() => setIsComputing(false), 500);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>🎯</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Objective 04: AI-Driven, Risk-Aware Route & Mode Recommendation Engine
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Autonomous multi-criteria optimization evaluating cost, transit duration, carbon emissions, and disruption risk
          </span>
        </div>

        <span style={{
          fontSize: '0.75rem',
          padding: '4px 10px',
          borderRadius: '20px',
          background: 'rgba(56, 189, 248, 0.1)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          fontWeight: 700
        }}>
          Multi-Objective Optimizer (Cost vs Risk vs Speed)
        </span>
      </div>

      {/* Grid: Controls on left, Recommended Mode Decision on right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {/* Controls Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.65)',
          padding: '1.25rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>
            ⚙️ Real-Time Mission Constraints
          </h4>

          {/* Weather Alert */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
              Meteorological Hazard State
            </label>
            <select
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.85rem'
              }}
            >
              <option value="Landslide Alert">⚠️ Severe Landslide Alert (High Risk)</option>
              <option value="Heavy Monsoon Rain">🌧️ Heavy Monsoon Surge (Moderate/High)</option>
              <option value="Dense Fog / Sandstorm">🌫️ Dense Valley Fog / Duststorm</option>
              <option value="Clear Roadway">☀️ Clear Skies & Stable Road Pass</option>
            </select>
          </div>

          {/* Terrain Type */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
              Target Geography & Corridor
            </label>
            <select
              value={terrainType}
              onChange={(e) => setTerrainType(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.85rem'
              }}
            >
              <option value="Alpine Pass">🏔️ High Altitude Alpine Pass (Himalayas)</option>
              <option value="Riverine Delta Basin">🌊 Flood-Prone Riverine Delta (Brahmaputra)</option>
              <option value="Arid Desert Frontier">🏜️ Arid Dune Frontier (Thar Desert)</option>
            </select>
          </div>

          {/* Urgency & Payload */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                Mission Urgency
              </label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#f8fafc',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Emergency SOS">🚨 Emergency SOS (Critical)</option>
                <option value="Priority Relief">⚡ Priority Relief (Medical)</option>
                <option value="Standard Cargo">📦 Standard Commercial (Scheduled)</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                <span>Payload Weight</span>
                <span style={{ color: '#38bdf8' }}>{payloadWeightKg} kg</span>
              </div>
              <input
                type="range"
                min="5"
                max="800"
                step="5"
                value={payloadWeightKg}
                onChange={(e) => setPayloadWeightKg(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', marginTop: '6px' }}
              />
            </div>
          </div>

          {/* Compute Button */}
          <button
            onClick={handleComputeRecommendation}
            disabled={isComputing}
            className="glow-btn-cyan"
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: isComputing ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px'
            }}
          >
            {isComputing ? '🔄 Running AI Mode Optimizer...' : '⚡ Recompute Optimal Route & Mode'}
          </button>
        </div>

        {/* AI Recommendation Result Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '12px',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AI Recommendation Engine Output
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {(recommendation.confidenceScore * 100).toFixed(0)}% Confidence Match
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
              <div style={{
                fontSize: '2.4rem',
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.2)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {recommendation.icon}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  {recommendation.modeName}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                  ● Best Efficiency Index for Given Constraints
                </span>
              </div>
            </div>

            {/* Rationale Box */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.7)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              color: '#e2e8f0'
            }}>
              <strong>Decision Rationale:</strong> {recommendation.rationale}
            </div>

            {/* Key Comparison Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Risk Reduction</span>
                <strong style={{ fontSize: '0.95rem', color: '#34d399' }}>+{recommendation.riskMitigationPct}%</strong>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Est. Duration</span>
                <strong style={{ fontSize: '0.95rem', color: '#38bdf8' }}>{recommendation.estimatedDuration}</strong>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Unit Cost</span>
                <strong style={{ fontSize: '0.95rem', color: '#f59e0b' }}>{recommendation.costPerKg}/kg</strong>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '8px 4px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>Carbon Delta</span>
                <strong style={{ fontSize: '0.95rem', color: '#a78bfa' }}>{recommendation.carbonGPerTonneKm} g</strong>
              </div>
            </div>
          </div>

          {/* Contingency Protocol */}
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            borderTop: '1px dashed rgba(255, 255, 255, 0.12)',
            paddingTop: '8px'
          }}>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>Contingency Fallback Protocol: </span>
            {recommendation.fallbackProtocol}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeRecommendationEngine;
