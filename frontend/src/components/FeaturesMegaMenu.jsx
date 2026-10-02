import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FeaturesMegaMenu = ({ isOpen, onClose, onSelectFeature }) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  const handleItemClick = (action) => {
    onSelectFeature(action);
    onClose();
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1100px, 96vw)',
        marginTop: '8px',
        background: isDark ? 'rgba(11, 17, 32, 0.98)' : '#ffffff',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
        borderRadius: '16px',
        boxShadow: isDark
          ? '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)'
          : '0 20px 45px -10px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(0, 0, 0, 0.05)',
        zIndex: 1000,
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 1fr) minmax(0, 3fr)',
        overflow: 'hidden',
        animation: 'fadeInSlideDown 0.2s ease-out'
      }}
    >
      {/* LEFT COLUMN: OVERVIEW */}
      <div
        style={{
          background: isDark ? 'rgba(15, 23, 42, 0.7)' : '#f8fafc',
          padding: '24px 22px',
          borderRight: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.25)' : '#e2e8f0'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{
          fontSize: '0.74rem',
          fontWeight: 800,
          color: '#0284c7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          OVERVIEW
        </div>

        {/* Overview Item 1 */}
        <div
          onClick={() => handleItemClick({ type: 'DASHBOARD', tab: 'ALL' })}
          style={{
            cursor: 'pointer',
            padding: '10px 12px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(2, 132, 199, 0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.background = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.09)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(2, 132, 199, 0.04)';
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isDark ? '#f8fafc' : '#020617', marginBottom: '4px' }}>
            Multi-Modal Logistics Management
          </div>
          <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.4 }}>
            Unified transport and dispatch coordination across road, rail, riverine barges, and autonomous UAV drones.
          </div>
        </div>

        {/* Overview Item 2 */}
        <div
          onClick={() => handleItemClick({ type: 'RISK_ENGINE' })}
          style={{
            cursor: 'pointer',
            padding: '10px 12px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(16, 185, 129, 0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.background = isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.09)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(16, 185, 129, 0.04)';
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isDark ? '#f8fafc' : '#020617', marginBottom: '4px' }}>
            Predictive Disruption Risk (ML)
          </div>
          <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.4 }}>
            Predicts road and mountain pass blockages hours in advance using digital elevation slope, rainfall, and soil tensors.
          </div>
        </div>

        {/* Overview Item 3 */}
        <div
          onClick={() => handleItemClick({ type: 'DASHBOARD', tab: 'OBJ_03' })}
          style={{
            cursor: 'pointer',
            padding: '10px 12px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(99, 102, 241, 0.04)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.background = isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.09)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(99, 102, 241, 0.04)';
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '0.92rem', color: isDark ? '#f8fafc' : '#020617', marginBottom: '4px' }}>
            Village Accessibility Triage (AVI)
          </div>
          <div style={{ fontSize: '0.78rem', color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.4 }}>
            Scores remote border settlements on a 0–100 index to trigger proactive life-saving medicine staging.
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
          <button
            onClick={() => handleItemClick({ type: 'DASHBOARD', tab: 'ALL' })}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Explore All 6 Objectives</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* RIGHT SECTION: 3-COLUMN FEATURES GRID */}
      <div style={{ padding: '24px 28px' }}>
        <div style={{
          fontSize: '0.74rem',
          fontWeight: 800,
          color: '#0284c7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          FEATURES & PLATFORM CAPABILITIES
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '18px 24px'
        }}>
          {/* COLUMN 1: OBJECTIVES & CORE PLATFORM */}
          <div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isDark ? '#64748b' : '#94a3b8',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Core Objectives
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Unified Data Model', sub: 'Objective 01', icon: '🔄', action: { type: 'DASHBOARD', tab: 'OBJ_01' } },
                { name: 'ML Disruption Risk', sub: 'Objective 02', icon: '🧠', action: { type: 'DASHBOARD', tab: 'OBJ_02' } },
                { name: 'Village Accessibility', sub: 'Objective 03', icon: '🏘️', action: { type: 'DASHBOARD', tab: 'OBJ_03' } },
                { name: 'AI Mode Rec Engine', sub: 'Objective 04', icon: '🎯', action: { type: 'DASHBOARD', tab: 'OBJ_04' } },
                { name: 'Disaster Alerts & Planner', sub: 'Objective 05', icon: '🚨', action: { type: 'DASHBOARD', tab: 'OBJ_05' } },
                { name: 'Case-Study Corridors', sub: 'Objective 06', icon: '🏔️', action: { type: 'DASHBOARD', tab: 'OBJ_06' } },
                { name: 'GIS Operations Map', sub: 'Fullscreen Map', icon: '🗺️', action: { type: 'DASHBOARD', tab: 'GIS_MAP' } }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(2, 132, 199, 0.08)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617', lineHeight: 1.2 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: AI & PREDICTIVE ROUTING */}
          <div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isDark ? '#64748b' : '#94a3b8',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              AI & Autonomous Logistics
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Heavy Cargo UAV Drone', sub: 'Autonomous Air-Drop', icon: '🚁', action: { type: 'DASHBOARD', tab: 'OBJ_01' } },
                { name: 'Interactive Risk Simulator', sub: 'Live Sliders & Prediction', icon: '⚡', action: { type: 'RISK_ENGINE' } },
                { name: 'Drag & Drop Coordinates', sub: 'Custom Geolocation Map', icon: '📍', action: { type: 'RISK_ENGINE' } },
                { name: 'Mountain Pass Reroute', sub: 'Monsoon Avalanche Bypass', icon: '⛰️', action: { type: 'DASHBOARD', tab: 'OBJ_04' } },
                { name: 'Alluvial River Freight', sub: 'Inland Waterway Vessels', icon: '🌊', action: { type: 'DASHBOARD', tab: 'OBJ_01' } },
                { name: 'Topographic Slope Tensor', sub: 'SRTM Elevation Profile', icon: '📐', action: { type: 'DASHBOARD', tab: 'OBJ_02' } },
                { name: 'MCDA Pareto Optimizer', sub: 'Cost vs Time vs Risk', icon: '📊', action: { type: 'DASHBOARD', tab: 'OBJ_04' } }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(2, 132, 199, 0.08)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617', lineHeight: 1.2 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: HUMANITARIAN RELIEF & OPERATIONS */}
          <div>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: isDark ? '#64748b' : '#94a3b8',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Relief & Operations
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'Fund Medical Supplies', sub: 'Humanitarian Sign Up', icon: '❤️', action: { type: 'MEDICAL_FUNDING' } },
                { name: 'Cold-Chain Insulin Pods', sub: 'Life-Saving Antivenom', icon: '🧊', action: { type: 'MEDICAL_FUNDING' } },
                { name: 'NGO & CSR Partner Portal', sub: 'Institutional Funding', icon: '🏢', action: { type: 'MEDICAL_FUNDING' } },
                { name: 'Verifiable Aid Certificate', sub: 'Real-Time Tracking ID', icon: '📜', action: { type: 'MEDICAL_FUNDING' } },
                { name: 'Helpdesk & Doubt AI', sub: 'Interactive Doubts Hub', icon: '💬', action: { type: 'HELPDESK' } },
                { name: 'Multi-Agency Alert Grid', sub: 'NDRF / BRO / SDRF', icon: '🛡️', action: { type: 'DASHBOARD', tab: 'OBJ_05' } },
                { name: 'All Platform Directory', sub: 'Full Feature Overview', icon: '📑', action: { type: 'DASHBOARD', tab: 'ALL' } }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleItemClick(item.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(2, 132, 199, 0.08)';
                    e.currentTarget.style.transform = 'translateX(3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617', lineHeight: 1.2 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesMegaMenu;
