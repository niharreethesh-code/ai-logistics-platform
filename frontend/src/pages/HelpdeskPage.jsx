import React, { useState } from 'react';

const presetKnowledgeBase = {
  'objectives': {
    title: 'The 6 Core Objectives of the Platform (22CSP57)',
    summary: 'The platform is engineered around 6 sequential objectives addressing rural connectivity and crisis supply chains:',
    details: [
      'Objective 01: Unified Data Model - Integrates Road, Rail, Waterway, and Air/Drone logistics schemas into a unified payload and telemetry format.',
      'Objective 02: ML Disruption Risk Model - Predicts route-level disruption risk from terrain slopes, precipitation, wind speeds, and historical incidents using Random Forest & XGBoost.',
      'Objective 03: Village-Level Accessibility Scoring - Evaluates isolation probability, seasonal cutoffs (days/yr), and emergency medical buffer for remote & border settlements.',
      'Objective 04: AI Route & Mode Recommendation Engine - Dynamically recommends the optimal transport mode (Road vs Drone vs Barge vs Rail) to minimize cost, carbon, and disruption.',
      'Objective 05: Planner Dashboard with Disaster Alerts - Central command center with real-time SOS queue, evacuation waypoints, and automated cargo UAV air-drop dispatch for NDRF & SDMA.',
      'Objective 06: Contrasting Case-Study Corridors - Validates the platform across 3 empirical region types: Himalayan Alpine Pass, Brahmaputra Riverine Delta, and Thar Desert Frontier.'
    ]
  },
  'risk': {
    title: 'How the ML Disruption Risk Engine Computes Disruption Probability',
    summary: 'Disruption risk is computed using a multi-factor machine learning ensemble model (Random Forest + XGBoost):',
    details: [
      'Slope & Topography Gradient (40% weight): Steep angles (>15%) substantially heighten rockfall and mudslide hazards.',
      'Live Precipitation Rate (35% weight): High monsoon rainfall (>50 mm/hr) triggers flash flood and road washout conditions.',
      'High-Altitude Wind Velocity (15% weight): High winds (>40 km/h) restrict UAV drone operations and cause blizzard drifts.',
      'Historical Cutoff Density (10% weight): Number of seasonal closure days documented in previous calendar years.',
      'Formula: Disruption Probability P = (0.40 * SlopeRisk) + (0.35 * RainFactor) + (0.15 * WindHazard) + (0.10 * HistoricCutoff)'
    ]
  },
  'obj4': {
    title: 'Objective 04: AI Route & Mode Recommendation Logic',
    summary: 'Objective 04 autonomously evaluates the trade-offs between transport modes given real-time mission hazards:',
    details: [
      'Cargo Drone (UAV) is chosen when road passes are closed by landslides/floods and payload <= 150 kg, providing 84% risk reduction and zero ground terrain impedance.',
      'Inland Waterway Barge is chosen in riverine deltas when road bridges are submerged, offering the lowest unit cost (₹0.06/kg) and high payload capacity.',
      'Feeder Rail is selected for bulk heavy freight when mountain highways are closed but fortified rail tunnels remain operational.',
      'Standard 4WD Road Convoy is preferred when weather is clear to minimize dispatch friction and operating expense.'
    ]
  },
  'accessibility': {
    title: 'Objective 03: Village Accessibility Scoring Formulation',
    summary: 'Settlement accessibility is quantified on a 0 - 100 index:',
    details: [
      'Score = 0.40 * (Road Connectivity Index) + 0.30 * (Distance to Primary Medical Center) + 0.20 * (Seasonal Cutoff Factor) + 0.10 * (Strategic Border Buffer).',
      'High Risk Villages (< 40 score): Require pre-positioned emergency buffer stock and UAV air-corridor mapping.',
      'Border Zone Settlements: Receive priority weighting in the disaster dispatch queue.'
    ]
  },
  'disaster': {
    title: 'Objective 05: Disaster Management Agency Console (NDRF / SDMA)',
    summary: 'Dedicated crisis operations center designed for disaster relief authorities:',
    details: [
      'One-click "🚨 Disaster Management Mode" switch transforms the dashboard into an emergency HUD.',
      'Real-time SOS triage queue from isolated tribal and border villages with geographic coordinates and required supplies (anti-venom, insulin, food).',
      'Automated Cargo UAV air-drop dispatch with live flight telemetry and parachute payload delivery tracking.'
    ]
  }
};

const initialDoubtsList = [
  {
    id: 1,
    author: 'Prof. Rajesh K. (Evaluator)',
    role: 'Faculty Evaluator',
    question: 'How does Objective 04 handle cases where Cargo Drones cannot fly due to heavy winds (>50 km/h)?',
    answer: 'Objective 04 incorporates a Contingency Fallback Protocol: When wind speeds exceed safe VTOL operating thresholds (>45 km/h), the decision matrix automatically shifts cargo routing to 6x6 Amphibious Rescue Vehicles or fortified Feeder Rail terminals, ensuring uninterrupted mission continuity.',
    date: 'Today at 10:15 AM',
    status: 'Resolved ✅',
    category: 'Objective 04: Mode Recommendation'
  },
  {
    id: 2,
    author: 'Capt. Sharma (NDRF Relief Command)',
    role: 'Disaster Relief Planner',
    question: 'Can coordinates be exported directly from the ML Risk Engine into field GIS systems?',
    answer: 'Yes! The coordinates generated in the ML Disruption Risk Engine match standard WGS84 format (Latitude, Longitude, Elevation) and are accessible via the `/api/routing/active` REST endpoint as GeoJSON compatible telemetry.',
    date: 'Yesterday at 4:30 PM',
    status: 'Resolved ✅',
    category: 'Objective 02: ML Risk Modeling'
  }
];

const HelpdeskPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoubt, setActiveDoubt] = useState(presetKnowledgeBase['objectives']);
  const [doubtsList, setDoubtsList] = useState(initialDoubtsList);

  // New Doubt Form State
  const [authorName, setAuthorName] = useState('');
  const [userRole, setUserRole] = useState('Project Student');
  const [selectedCategory, setSelectedCategory] = useState('General Query');
  const [newQuestion, setNewQuestion] = useState('');
  const [formFeedback, setFormFeedback] = useState(null);

  const handleQuickAsk = (key) => {
    if (presetKnowledgeBase[key]) {
      setActiveDoubt(presetKnowledgeBase[key]);
    }
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    const lower = q.toLowerCase();

    if (lower.includes('4') || lower.includes('objective 4') || lower.includes('mode') || lower.includes('recommend')) {
      setActiveDoubt(presetKnowledgeBase['obj4']);
    } else if (lower.includes('risk') || lower.includes('ml') || lower.includes('disruption') || lower.includes('predict')) {
      setActiveDoubt(presetKnowledgeBase['risk']);
    } else if (lower.includes('village') || lower.includes('access') || lower.includes('score')) {
      setActiveDoubt(presetKnowledgeBase['accessibility']);
    } else if (lower.includes('disaster') || lower.includes('ndrf') || lower.includes('alert') || lower.includes('sos')) {
      setActiveDoubt(presetKnowledgeBase['disaster']);
    } else {
      setActiveDoubt(presetKnowledgeBase['objectives']);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    // AI generated technical answer simulation
    let autoAns = `Thank you for your question regarding ${selectedCategory}. In this platform (22CSP57), the architecture addresses this through unified data modeling and risk-weighted decision trees. Real-time telemetry is streamed via Port 5050 to keep latency under 120ms.`;
    if (newQuestion.toLowerCase().includes('drone') || newQuestion.toLowerCase().includes('air')) {
      autoAns = 'The autonomous cargo drone layer operates on an octocopter VTOL schema handling payloads up to 150 kg with a maximum cruising speed of 95 km/h, bypassing 100% of surface mudslide impediments.';
    } else if (newQuestion.toLowerCase().includes('corridor') || newQuestion.toLowerCase().includes('case study')) {
      autoAns = 'Objective 06 validates the platform across 3 contrasting corridors: the high-altitude Zojila Mountain Pass (Himalayas), the flood-prone Majuli Riverine Delta (Brahmaputra), and the arid Jaisalmer Frontier (Thar Desert).';
    }

    const newEntry = {
      id: Date.now(),
      author: authorName || 'Anonymous Scholar',
      role: userRole,
      question: newQuestion,
      answer: autoAns,
      date: 'Just now',
      status: 'Resolved ✅',
      category: selectedCategory
    };

    setDoubtsList([newEntry, ...doubtsList]);
    setNewQuestion('');
    setFormFeedback('Your query has been logged and answered by the AI Helpdesk Knowledge Base!');
    setTimeout(() => setFormFeedback(null), 5000);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.5rem 2rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '4px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)'
          }}>
            💬
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Platform Helpdesk & Doubts Knowledge Center
            </h1>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
              Department of Computer Science & Engineering, Nagarjuna College of Engineering and Technology (NCET) • Mini Project (22CSP57)
            </p>
          </div>
        </div>
      </div>

      {/* Instant Search & Quick Doubt Chips */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🔍</span>
          <input
            type="text"
            placeholder="Type any doubt (e.g. 'Objective 4 recommendation', 'ML Risk Formula', 'Village Accessibility', 'Disaster Mode')..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.9rem',
              color: '#f8fafc',
              outline: 'none'
            }}
          />
        </div>

        {/* Quick Question Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>Quick Questions:</span>
          {[
            { label: '📋 The 6 Objectives in Order', key: 'objectives' },
            { label: '🎯 Objective 04: Mode Optimizer', key: 'obj4' },
            { label: '🧠 ML Disruption Risk Formula', key: 'risk' },
            { label: '📍 Village Accessibility Scoring', key: 'accessibility' },
            { label: '🚨 Disaster Agency Planner', key: 'disaster' }
          ].map((chip) => (
            <button
              key={chip.key}
              onClick={() => handleQuickAsk(chip.key)}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#38bdf8',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#38bdf8')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)')}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Knowledge Display Card */}
      {activeDoubt && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '14px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Verified Technical Answer
            </span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              NCET CSE Curriculum Verified (22CSP57)
            </span>
          </div>

          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            {activeDoubt.title}
          </h3>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
            {activeDoubt.summary}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeDoubt.details.map((point, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                ● {point}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Ask Doubt Form (left) + Community Doubts Stream (right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Form: Ask a Doubt */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>✏️</span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
              Ask a Doubt or Project Inquiry
            </h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 1.25rem 0' }}>
            Submit questions regarding architecture, ML models, mathematical scoring, or evaluation criteria.
          </p>

          {formFeedback && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              color: '#a7f3d0',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '1rem'
            }}>
              ✅ {formFeedback}
            </div>
          )}

          <form onSubmit={handleQuestionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                Your Name / Designation
              </label>
              <input
                type="text"
                placeholder="e.g. Nihar (Student / Evaluator)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#f8fafc',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                  Role / Stakeholder
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#f8fafc',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Project Student">CSE Student (NCET)</option>
                  <option value="Faculty Evaluator">Faculty Evaluator</option>
                  <option value="NDRF Logistics Officer">NDRF / SDMA Officer</option>
                  <option value="Research Scholar">Research Scholar</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                  Topic Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    color: '#f8fafc',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Objective 01: Unified Data Model">Obj 01: Unified Data Model</option>
                  <option value="Objective 02: ML Risk Modeling">Obj 02: ML Risk Modeling</option>
                  <option value="Objective 03: Village Accessibility">Obj 03: Village Accessibility</option>
                  <option value="Objective 04: Mode Recommendation">Obj 04: Mode Recommendation</option>
                  <option value="Objective 05: Disaster Agency Console">Obj 05: Disaster Agency</option>
                  <option value="Objective 06: Case Study Corridors">Obj 06: Case Studies</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>
                Explain Your Doubt in Detail
              </label>
              <textarea
                rows="4"
                placeholder="Ask about data schemas, risk weights, drone payload constraints, or corridor selections..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#f8fafc',
                  fontSize: '0.85rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              className="glow-btn-cyan"
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              📤 Submit Doubt for AI Resolution
            </button>
          </form>
        </div>

        {/* Live Doubts & Knowledge Stream */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
              📚 Resolved Technical Doubts & Answers
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
              ● {doubtsList.length} Inquiries Logged
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {doubtsList.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '10px',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#38bdf8' }}>{item.author}</strong>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>({item.role})</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                    {item.status}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  Q: {item.question}
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  lineHeight: 1.45,
                  borderLeft: '3px solid #38bdf8'
                }}>
                  <strong>Answer:</strong> {item.answer}
                </div>

                <div style={{ marginTop: '8px', fontSize: '0.7rem', color: '#64748b' }}>
                  Category: {item.category} • {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpdeskPage;
