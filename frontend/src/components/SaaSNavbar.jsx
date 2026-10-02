import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import FeaturesMegaMenu from './FeaturesMegaMenu';

const SaaSNavbar = ({
  currentPage,
  onNavigate,
  onOpenLogin,
  currentUser,
  onLogout
}) => {
  const { isDark } = useTheme();
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsFeaturesOpen(false);
        setIsObjectivesOpen(false);
        setIsSolutionsOpen(false);
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setIsFeaturesOpen(false);
    setIsObjectivesOpen(false);
    setIsSolutionsOpen(false);
    setIsResourcesOpen(false);
  };

  const handleSelectFeature = (action) => {
    closeAllMenus();
    if (action.type === 'DASHBOARD') {
      onNavigate('DASHBOARD', action.tab);
    } else if (action.type === 'RISK_ENGINE') {
      onNavigate('RISK_ENGINE');
    } else if (action.type === 'HELPDESK') {
      onNavigate('HELPDESK');
    } else if (action.type === 'MEDICAL_FUNDING') {
      onNavigate('MEDICAL_FUNDING');
    }
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: isDark ? 'rgba(9, 13, 22, 0.94)' : 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.25)' : '#e2e8f0'}`,
        padding: '0.65rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.45)' : '0 2px 10px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* 1. BRAND LOGO (Styled like Oxmaint AI in Image 1) */}
      <div
        onClick={() => {
          closeAllMenus();
          onNavigate('DASHBOARD', 'ALL');
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)',
          border: '1.5px solid rgba(56, 189, 248, 0.4)'
        }}>
          🛰️
        </div>
        <div>
          <div style={{
            fontWeight: 900,
            fontSize: '1.25rem',
            letterSpacing: '-0.02em',
            color: isDark ? '#f8fafc' : '#0f172a',
            lineHeight: 1.1
          }}>
            LOGIX <span style={{ color: '#f59e0b' }}>AI</span>
          </div>
          <div style={{
            fontSize: '0.68rem',
            color: isDark ? '#94a3b8' : '#64748b',
            fontWeight: 600,
            letterSpacing: '0.02em'
          }}>
            AI-Native Multi-Modal & Emergency Logistics
          </div>
        </div>
      </div>

      {/* 2. CENTER DROPDOWN MENUS (Features, Solutions, Objectives, Resources, Pricing/Fund) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        position: 'relative'
      }}>
        {/* Features Dropdown (Mega Menu) */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => {
              setIsFeaturesOpen(!isFeaturesOpen);
              setIsObjectivesOpen(false);
              setIsSolutionsOpen(false);
              setIsResourcesOpen(false);
            }}
            style={{
              background: isFeaturesOpen ? (isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe') : 'transparent',
              color: isFeaturesOpen ? '#0284c7' : isDark ? '#f8fafc' : '#0f172a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Features</span>
            <span style={{ fontSize: '0.75rem', transform: isFeaturesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>
        </div>

        {/* Objectives Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => {
              setIsObjectivesOpen(!isObjectivesOpen);
              setIsFeaturesOpen(false);
              setIsSolutionsOpen(false);
              setIsResourcesOpen(false);
            }}
            style={{
              background: isObjectivesOpen ? (isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe') : 'transparent',
              color: isObjectivesOpen ? '#0284c7' : isDark ? '#f8fafc' : '#0f172a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Objectives</span>
            <span style={{ fontSize: '0.75rem', transform: isObjectivesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>

          {isObjectivesOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                width: '320px',
                background: isDark ? 'rgba(11, 17, 32, 0.98)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
                borderRadius: '12px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 1001
              }}
            >
              {[
                { id: 'ALL', num: 'All', title: 'Master Overview (All 6)', icon: '🌐' },
                { id: 'OBJ_01', num: '01', title: 'Unified Multi-Modal Model', icon: '🔄' },
                { id: 'OBJ_02', num: '02', title: 'ML Route Disruption Risk', icon: '🧠' },
                { id: 'OBJ_03', num: '03', title: 'Village Accessibility Scoring', icon: '🏘️' },
                { id: 'OBJ_04', num: '04', title: 'AI Route & Mode Rec', icon: '🎯' },
                { id: 'OBJ_05', num: '05', title: 'Disaster Planner & Alerts', icon: '🚨' },
                { id: 'OBJ_06', num: '06', title: 'Case-Study Corridors', icon: '🏔️' },
                { id: 'GIS_MAP', num: 'GIS', title: 'GIS Operations Map', icon: '🗺️' }
              ].map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => {
                    closeAllMenus();
                    onNavigate('DASHBOARD', obj.id);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(56, 189, 248, 0.12)' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{obj.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617' }}>
                      {obj.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      Objective {obj.num}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Solutions Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => {
              setIsSolutionsOpen(!isSolutionsOpen);
              setIsFeaturesOpen(false);
              setIsObjectivesOpen(false);
              setIsResourcesOpen(false);
            }}
            style={{
              background: isSolutionsOpen ? (isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe') : 'transparent',
              color: isSolutionsOpen ? '#0284c7' : isDark ? '#f8fafc' : '#0f172a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Solution</span>
            <span style={{ fontSize: '0.75rem', transform: isSolutionsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>

          {isSolutionsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                width: '320px',
                background: isDark ? 'rgba(11, 17, 32, 0.98)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
                borderRadius: '12px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 1001
              }}
            >
              {[
                { title: 'Emergency Disaster Response', desc: 'NDRF / SDRF Multi-agency mobilization', icon: '🚨', action: () => onNavigate('DASHBOARD', 'OBJ_05') },
                { title: 'Himalayan Mountain Passes', desc: 'High-altitude landslide & snow cutoff rerouting', icon: '🏔️', action: () => onNavigate('RISK_ENGINE') },
                { title: 'Riverine Flood Delta Logistics', desc: 'Alluvial barge freight for severed islands', icon: '🌊', action: () => onNavigate('DASHBOARD', 'OBJ_06') },
                { title: 'Medical Cold-Chain Air-Drop', desc: 'Autonomous drone delivery for antivenom & insulin', icon: '🧊', action: () => onNavigate('MEDICAL_FUNDING') }
              ].map((sol, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    closeAllMenus();
                    sol.action();
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(56, 189, 248, 0.12)' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{sol.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617' }}>
                      {sol.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {sol.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resources Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => {
              setIsResourcesOpen(!isResourcesOpen);
              setIsFeaturesOpen(false);
              setIsObjectivesOpen(false);
              setIsSolutionsOpen(false);
            }}
            style={{
              background: isResourcesOpen ? (isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe') : 'transparent',
              color: isResourcesOpen ? '#0284c7' : isDark ? '#f8fafc' : '#0f172a',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>Resources</span>
            <span style={{ fontSize: '0.75rem', transform: isResourcesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
          </button>

          {isResourcesOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                width: '280px',
                background: isDark ? 'rgba(11, 17, 32, 0.98)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
                borderRadius: '12px',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 1001
              }}
            >
              {[
                { title: 'Helpdesk & Doubt Assistant', desc: 'Ask questions & doubt clearing', icon: '💬', action: () => onNavigate('HELPDESK') },
                { title: 'ML Risk Engine Playground', desc: 'Drag-and-drop location risk testing', icon: '📍', action: () => onNavigate('RISK_ENGINE') },
                { title: 'Mathematical Formulations', desc: 'Formulas and theoretical foundations', icon: '📐', action: () => onNavigate('DASHBOARD', 'OBJ_02') },
                { title: 'REST API Documentation', desc: 'Flask endpoints & schema specifications', icon: '📡', action: () => onNavigate('DASHBOARD', 'OBJ_01') }
              ].map((res, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    closeAllMenus();
                    res.action();
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? 'rgba(56, 189, 248, 0.12)' : '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{res.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isDark ? '#f8fafc' : '#020617' }}>
                      {res.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b' }}>
                      {res.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing / Relief Fund (Simple direct button) */}
        <button
          type="button"
          onClick={() => {
            closeAllMenus();
            onNavigate('MEDICAL_FUNDING');
          }}
          style={{
            background: currentPage === 'MEDICAL_FUNDING' ? (isDark ? 'rgba(16, 185, 129, 0.18)' : '#d1fae5') : 'transparent',
            color: currentPage === 'MEDICAL_FUNDING' ? '#10b981' : isDark ? '#f8fafc' : '#0f172a',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Pricing & Relief Fund
        </button>
      </div>

      {/* 3. RIGHT ACTIONS: Theme Toggle, Signup Pill Button, Login Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <ThemeToggle />

        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
              border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : '#bae6fd'}`,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: isDark ? '#38bdf8' : '#0369a1'
            }}>
              <span>👤</span>
              <span>{currentUser.name}</span>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: isDark ? '#94a3b8' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.76rem',
                fontWeight: 600
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {/* Deep Navy/Blue Pill Signup Button (matching Image 1) */}
            <button
              type="button"
              onClick={() => {
                closeAllMenus();
                onNavigate('MEDICAL_FUNDING');
              }}
              style={{
                background: '#1e3a8a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                padding: '9px 24px',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(30, 58, 138, 0.4)',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1e3a8a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Signup</span>
            </button>

            {/* Amber/Gold Login Text Button (matching Image 1) */}
            <button
              type="button"
              onClick={() => {
                closeAllMenus();
                onOpenLogin();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#d97706',
                fontSize: '0.9rem',
                fontWeight: 800,
                cursor: 'pointer',
                padding: '6px 8px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#b45309';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#d97706';
              }}
            >
              Login
            </button>
          </>
        )}
      </div>

      {/* Render the Features Mega Menu Dropdown */}
      <FeaturesMegaMenu
        isOpen={isFeaturesOpen}
        onClose={() => setIsFeaturesOpen(false)}
        onSelectFeature={handleSelectFeature}
      />
    </nav>
  );
};

export default SaaSNavbar;
