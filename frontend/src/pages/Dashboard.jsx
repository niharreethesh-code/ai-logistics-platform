import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import RiskPanel from '../components/RiskPanel';
import RoutePanel from '../components/RoutePanel';
import VillageTable from '../components/VillageTable';
import MultimodalPanel from '../components/MultimodalPanel';
import DisasterModePanel from '../components/DisasterModePanel';
import CaseStudySelector from '../components/CaseStudySelector';
import MLRiskSimulator from '../components/MLRiskSimulator';
import ThemeToggle from '../components/ThemeToggle';
import { getVillages, getRiskAssessment, getActiveRoutes, getCorridors, getMultimodalModes } from '../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'MULTIMODAL' | 'ML_RISK' | 'DISASTER' | 'CASE_STUDIES'
  const [isDisasterMode, setIsDisasterMode] = useState(false);
  const [activeMode, setActiveMode] = useState('drone'); // 'road' | 'rail' | 'waterway' | 'drone'

  // Corridors (Objective 06)
  const [corridors, setCorridors] = useState([]);
  const [selectedCorridor, setSelectedCorridor] = useState(null);

  // Multimodal Modes (Objective 01)
  const [multimodalModes, setMultimodalModes] = useState([]);

  // Villages & Routes
  const [villages, setVillages] = useState([]);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [riskData, setRiskData] = useState(null);

  const [alertBanner, setAlertBanner] = useState(
    '⚡ Objective 05 Alert: Monsoon surge active in valley sectors. AI Route Engine recommends Cargo Drone (UAV) & Waterway Freight diversion.'
  );

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [corridorsRes, modesRes, villagesRes, riskRes, routesRes] = await Promise.allSettled([
          getCorridors(),
          getMultimodalModes(),
          getVillages(),
          getRiskAssessment(),
          getActiveRoutes()
        ]);

        if (corridorsRes.status === 'fulfilled' && corridorsRes.value?.data) {
          setCorridors(corridorsRes.value.data);
          setSelectedCorridor(corridorsRes.value.data[0]);
          // Initialize villages from the first case study corridor
          if (corridorsRes.value.data[0]?.villages) {
            setVillages(corridorsRes.value.data[0].villages);
            setSelectedVillage(corridorsRes.value.data[0].villages[0]);
          }
        }

        if (modesRes.status === 'fulfilled' && modesRes.value?.data) {
          setMultimodalModes(modesRes.value.data);
        }

        if (riskRes.status === 'fulfilled' && riskRes.value?.data) {
          setRiskData(riskRes.value.data);
        }

        if (routesRes.status === 'fulfilled' && routesRes.value?.routes) {
          setRoutes(routesRes.value.routes);
        }
      } catch (err) {
        console.warn('Initial data load error:', err);
      }
    }

    loadInitialData();
  }, []);

  // When user picks a case study corridor (Objective 06), update the active dataset!
  const handleSelectCorridor = (corridor) => {
    setSelectedCorridor(corridor);
    if (corridor.villages && corridor.villages.length > 0) {
      setVillages(corridor.villages);
      setSelectedVillage(corridor.villages[0]);
    }
    setAlertBanner(`📍 Switched to [${corridor.name}]. Primary hazards: ${corridor.primaryHazards.join(', ')}. Preferred mode: ${corridor.activeModeRecommendation}`);
  };

  const handleOptimizeRoute = () => {
    setRoutes(prev => prev.map(r => ({
      ...r,
      estimatedDuration: '1h 35m',
      status: 'Optimized (Zero Disruption)'
    })));
    setAlertBanner('⚡ AI Pathfinding Complete: Disruption risk mitigated by 82% using multi-modal airway/waterway transfer.');
  };

  const highRiskCount = villages.filter(v => v.riskStatus === 'High').length;
  const avgAccessScore = villages.length > 0 ? Math.round(villages.reduce((acc, v) => acc + v.accessScore, 0) / villages.length) : 56;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      {/* Top Header with Department and Project Metadata */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: isDisasterMode ? '#ef4444' : 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            boxShadow: isDisasterMode ? '0 0 25px #ef4444' : '0 0 20px rgba(56, 189, 248, 0.4)',
            transition: 'all 0.3s'
          }}>
            {isDisasterMode ? '🚨' : '🛰️'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '1.55rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.03em' }}>
                AI-LOGIX COMMAND PLATFORM
              </h1>
              <span style={{
                background: isDisasterMode ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.15)',
                color: isDisasterMode ? '#fca5a5' : '#34d399',
                border: `1px solid ${isDisasterMode ? '#ef4444' : 'rgba(16, 185, 129, 0.3)'}`,
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {isDisasterMode ? 'CRISIS RESPONSE ACTIVE' : 'ALL 6 OBJECTIVES ONLINE'}
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
              Mini Project (22CSP57) • Dept. of CSE, NCET • Multi-Modal Disaster & Rural Supply Chain
            </p>
          </div>
        </div>

        {/* Agency Quick Switcher, Light/Dark Mode Toggle & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsDisasterMode(!isDisasterMode)}
            style={{
              background: isDisasterMode ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fff',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isDisasterMode ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none'
            }}
          >
            <span>{isDisasterMode ? '🔴 Crisis Mode Active' : '🚨 Disaster Management Mode'}</span>
          </button>

          {/* Light / Dark Mode Toggle in Top Right */}
          <ThemeToggle />
        </div>
      </header>

      {/* Navigation Filter Tabs corresponding to the 6 Objectives */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        background: 'rgba(15, 23, 42, 0.75)',
        padding: '4px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {[
          { id: 'ALL', label: '🌐 Unified Command View (All 6 Objectives)' },
          { id: 'MULTIMODAL', label: '🔄 Obj 01: Multi-Modal Model (Road, Rail, Water, Air)' },
          { id: 'ML_RISK', label: '🧠 Obj 02: ML Disruption Risk Predictor' },
          { id: 'DISASTER', label: '🚨 Obj 05: Disaster & Relief Agency Center' },
          { id: 'CASE_STUDIES', label: '🏔️ Obj 06: Contrasting Case-Study Corridors' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? '#38bdf8' : 'transparent',
              color: activeTab === tab.id ? '#0f172a' : '#94a3b8',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alert Banner */}
      {alertBanner && (
        <div style={{
          background: isDisasterMode ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.15) 100%)' : 'linear-gradient(90deg, rgba(2, 132, 199, 0.18) 0%, rgba(99, 102, 241, 0.12) 100%)',
          border: `1px solid ${isDisasterMode ? '#ef4444' : 'rgba(56, 189, 248, 0.35)'}`,
          borderRadius: '10px',
          padding: '10px 16px',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: isDisasterMode ? '#fecaca' : '#e0f2fe',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{isDisasterMode ? '⚠️' : '⚡'}</span>
            <span>{alertBanner}</span>
          </div>
          <button
            onClick={() => setAlertBanner(null)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.1rem' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Obj 06 Active Corridor
          </span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {selectedCorridor?.name || 'Himalayan Pass'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>
            {selectedCorridor?.elevationRange || 'Elev: 1800m - 4200m'}
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Obj 04 Mode Recommendation
          </span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
            {selectedCorridor?.activeModeRecommendation || 'Heavy Cargo Drone (UAV)'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>● Risk-Aware Autonomous Plan</span>
        </div>

        <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Obj 03 Remote Settlements
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
            {villages.length} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Monitored</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: highRiskCount > 0 ? '#f43f5e' : '#10b981', fontWeight: 600 }}>
            {highRiskCount} High Risk Cutoffs
          </span>
        </div>

        <div className="glass-panel" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Obj 02 ML Disruption Probability
          </span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '2px' }}>
            48% <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Moderate</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>Rain & Landslide model active</span>
        </div>
      </div>

      {/* Conditionally rendered panels according to user tab selection or Unified view */}

      {/* Tab: MULTIMODAL */}
      {(activeTab === 'ALL' || activeTab === 'MULTIMODAL') && (
        <MultimodalPanel
          modes={multimodalModes}
          activeMode={activeMode}
          onSelectMode={setActiveMode}
        />
      )}

      {/* Tab: ML_RISK */}
      {(activeTab === 'ALL' || activeTab === 'ML_RISK') && (
        <MLRiskSimulator />
      )}

      {/* Tab: DISASTER (or if Disaster Mode is triggered) */}
      {(activeTab === 'ALL' || activeTab === 'DISASTER' || isDisasterMode) && (
        <DisasterModePanel
          isDisasterMode={isDisasterMode}
          onToggleDisasterMode={() => setIsDisasterMode(!isDisasterMode)}
        />
      )}

      {/* Tab: CASE_STUDIES */}
      {(activeTab === 'ALL' || activeTab === 'CASE_STUDIES') && (
        <CaseStudySelector
          corridors={corridors}
          selectedCorridor={selectedCorridor}
          onSelectCorridor={handleSelectCorridor}
        />
      )}

      {/* Main Geospatial Map & Intelligence Panels */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
        gap: '1.5rem',
        alignItems: 'start',
        marginBottom: '1.5rem'
      }}>
        <div>
          <MapView
            villages={villages}
            selectedVillage={selectedVillage}
            onSelectVillage={setSelectedVillage}
            routes={routes}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <RiskPanel riskData={riskData} selectedVillage={selectedVillage} />
          <RoutePanel routes={routes} onOptimize={handleOptimizeRoute} />
        </div>
      </div>

      {/* Objective 03 Village Table with Border Settlement isolation filters */}
      <div>
        <VillageTable
          villages={villages}
          selectedVillage={selectedVillage}
          onSelectVillage={setSelectedVillage}
        />
      </div>

      {/* Footer with NCET Project Attribution */}
      <footer style={{
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: '#64748b',
        fontSize: '0.8rem'
      }}>
        <div>
          <strong>AI-Driven Multi-Modal Logistics & Risk Platform</strong> • Mini Project (22CSP57) • Dept. of CSE, NCET
        </div>
        <div>
          Unified Data Model • ML Disruption Risk • Remote Village Scoring • Disaster Management Agency
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
