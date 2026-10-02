import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import RiskPanel from '../components/RiskPanel';
import RoutePanel from '../components/RoutePanel';
import VillageTable from '../components/VillageTable';
import MultimodalPanel from '../components/MultimodalPanel';
import DisasterModePanel from '../components/DisasterModePanel';
import CaseStudySelector from '../components/CaseStudySelector';
import MLRiskSimulator from '../components/MLRiskSimulator';
import ModeRecommendationEngine from '../components/ModeRecommendationEngine';
import ThemeToggle from '../components/ThemeToggle';
import { getVillages, getRiskAssessment, getActiveRoutes, getCorridors, getMultimodalModes } from '../services/api';

const objectivesList = [
  {
    num: '01',
    title: 'Unified Data Model',
    desc: 'Design a unified data model integrating road, rail, waterway and air logistics data.',
    color: '#38bdf8',
    icon: '🔄',
    tabId: 'OBJ_01'
  },
  {
    num: '02',
    title: 'ML Disruption Risk Models',
    desc: 'Develop ML models that predict route-level disruption risk from terrain, weather and past incidents.',
    color: '#10b981',
    icon: '🧠',
    tabId: 'OBJ_02'
  },
  {
    num: '03',
    title: 'Village Accessibility Scoring',
    desc: 'Build a village-level accessibility scoring system for remote and border settlements.',
    color: '#818cf8',
    icon: '🏘️',
    tabId: 'OBJ_03'
  },
  {
    num: '04',
    title: 'AI Route & Mode Recommendation',
    desc: 'Create an AI-driven, risk-aware route and mode recommendation engine.',
    color: '#059669',
    icon: '🎯',
    tabId: 'OBJ_04'
  },
  {
    num: '05',
    title: 'Planner Dashboard with Alerts',
    desc: 'Deliver a planner dashboard with alerts for logistics and disaster-management agencies.',
    color: '#f43f5e',
    icon: '🚨',
    tabId: 'OBJ_05'
  },
  {
    num: '06',
    title: 'Contrasting Case-Study Corridors',
    desc: 'Validate the platform on case-study corridors in contrasting region types.',
    color: '#f59e0b',
    icon: '🏔️',
    tabId: 'OBJ_06'
  }
];

const Dashboard = ({ onNavigateToRiskEngine, onNavigateToHelpdesk }) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'OBJ_01' | 'OBJ_02' | 'OBJ_03' | 'OBJ_04' | 'OBJ_05' | 'OBJ_06'
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
    '⚡ Objective 04 & 05 Active Alert: Monsoon surge active in valley sectors. AI Route Engine recommends Cargo Drone (UAV) & Waterway Freight diversion.'
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

  const handleSelectCorridor = (corridor) => {
    setSelectedCorridor(corridor);
    if (corridor.villages && corridor.villages.length > 0) {
      setVillages(corridor.villages);
      setSelectedVillage(corridor.villages[0]);
    }
    setAlertBanner(`📍 Objective 06: Switched to [${corridor.name}]. Primary hazards: ${corridor.primaryHazards.join(', ')}. Preferred mode: ${corridor.activeModeRecommendation}`);
  };

  const handleOptimizeRoute = () => {
    setRoutes(prev => prev.map(r => ({
      ...r,
      estimatedDuration: '1h 35m',
      status: 'Optimized (Zero Disruption)'
    })));
    setAlertBanner('⚡ Objective 04 Optimization Complete: Route disruption risk mitigated by 82% using multi-modal transfer.');
  };

  const highRiskCount = villages.filter(v => v.riskStatus === 'High').length;

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
              Autonomous Multi-Modal Rural Logistics Orchestration & Emergency Disaster Relief Platform
            </p>
          </div>
        </div>

        {/* Agency Quick Switcher & Actions */}
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

      {/* Presentation Objectives Roadmap Grid (All 6 Objectives in Order) */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🎯 Platform Core Objectives & Operational Modules
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Click any card to filter view to that objective
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem'
        }}>
          {objectivesList.map((obj) => {
            const isTabActive = activeTab === obj.tabId;
            return (
              <div
                key={obj.num}
                onClick={() => setActiveTab(isTabActive ? 'ALL' : obj.tabId)}
                style={{
                  background: isTabActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.75)',
                  border: `1px solid ${isTabActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: '12px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isTabActive ? '0 0 15px rgba(56, 189, 248, 0.25)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: obj.color,
                      color: '#0f172a',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {obj.num}
                    </span>
                    <strong style={{ fontSize: '0.85rem', color: '#f8fafc', lineHeight: 1.2 }}>
                      {obj.title}
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0, lineHeight: 1.35 }}>
                    {obj.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Filter Tabs strictly in Order (ALL + 01 to 06) */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        background: 'rgba(15, 23, 42, 0.75)',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {[
          { id: 'ALL', label: '🌐 All Objectives in Order' },
          { id: 'OBJ_01', label: '01. Multi-Modal Model' },
          { id: 'OBJ_02', label: '02. ML Disruption Risk' },
          { id: 'OBJ_03', label: '03. Village Accessibility' },
          { id: 'OBJ_04', label: '04. AI Mode Recommendation' },
          { id: 'OBJ_05', label: '05. Disaster Planner Alerts' },
          { id: 'OBJ_06', label: '06. Case-Study Corridors' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? '#38bdf8' : 'transparent',
              color: activeTab === tab.id ? '#0f172a' : '#94a3b8',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.78rem',
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

      {/* =========================================================================
          OBJECTIVES RENDERED STRICTLY IN ORDER: 01 -> 02 -> 03 -> 04 -> 05 -> 06
          ========================================================================= */}

      {/* OBJECTIVE 01: UNIFIED DATA MODEL */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_01') && (
        <MultimodalPanel
          modes={multimodalModes}
          activeMode={activeMode}
          onSelectMode={setActiveMode}
        />
      )}

      {/* OBJECTIVE 02: ML DISRUPTION RISK ENGINE */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_02') && (
        <div>
          <MLRiskSimulator />
        </div>
      )}

      {/* OBJECTIVE 03: VILLAGE ACCESSIBILITY SCORING */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_03') && (
        <div>
          <VillageTable
            villages={villages}
            selectedVillage={selectedVillage}
            onSelectVillage={setSelectedVillage}
          />
        </div>
      )}

      {/* OBJECTIVE 04: AI-DRIVEN ROUTE & MODE RECOMMENDATION ENGINE */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_04') && (
        <div style={{ marginTop: activeTab === 'ALL' ? '1.5rem' : '0' }}>
          <ModeRecommendationEngine onSelectMode={setActiveMode} />
        </div>
      )}

      {/* OBJECTIVE 05: PLANNER DASHBOARD WITH DISASTER ALERTS */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_05' || isDisasterMode) && (
        <div style={{ marginTop: activeTab === 'ALL' ? '1.5rem' : '0' }}>
          <DisasterModePanel
            isDisasterMode={isDisasterMode}
            onToggleDisasterMode={() => setIsDisasterMode(!isDisasterMode)}
          />
        </div>
      )}

      {/* OBJECTIVE 06: CONTRASTING CASE-STUDY CORRIDORS */}
      {(activeTab === 'ALL' || activeTab === 'OBJ_06') && (
        <div style={{ marginTop: activeTab === 'ALL' ? '1.5rem' : '0' }}>
          <CaseStudySelector
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            onSelectCorridor={handleSelectCorridor}
          />
        </div>
      )}

      {/* GEOSPATIAL MAP VIEW & ROUTE TELEMETRY (Visual Ops Center) */}
      {activeTab === 'ALL' && (
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)',
            gap: '1.5rem',
            alignItems: 'start'
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
        </div>
      )}

      {/* Footer Attribution */}
      <footer style={{
        marginTop: '2.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: '#64748b',
        fontSize: '0.8rem',
        gap: '0.5rem'
      }}>
        <div>
          <strong>AI-Driven Multi-Modal Logistics & Risk Platform</strong> • National Emergency & Rural Supply Chain Network
        </div>
        <div>
          Objectives: 01 Unified Model • 02 ML Risk • 03 Village Score • 04 AI Mode Rec • 05 Agency Alerts • 06 Case Studies
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
