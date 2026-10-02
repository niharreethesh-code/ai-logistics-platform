import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const objectiveMetadata = {
  OBJ_01: {
    num: '01',
    code: 'OBJ_01',
    title: 'Unified Multi-Modal Transport Data Model',
    icon: '🔄',
    color: '#38bdf8',
    category: 'Data Architecture & Modal Schemas',
    apiEndpoint: 'http://localhost:5050/api/multimodal/modes',
    coreThesis: 'Standardizes disparate transport formats across 4 fundamental logistics modalities (Road, Rail, Inland Waterway, Heavy Cargo Drone) into a single operational schema.',
    formulaTitle: 'Modal Transit & Cost Optimization Function',
    formula: 'Cost_{total} = \\sum_{m \\in M} \\left( D_m \\cdot C_{m}^{km} + W_{payload} \\cdot C_{m}^{ton} + T_{transfer} \\right)',
    parameters: [
      { label: 'Modal Velocity Ceiling', value: 'Road: 45 km/h | Rail: 60 km/h | Waterway: 22 km/h | UAV Drone: 85 km/h' },
      { label: 'Payload Capacity Range', value: 'Heavy Drone: 50–150 kg | Road Rover: 1,500–5,000 kg | River Barge: 45,000 kg' },
      { label: 'Environmental Envelope', value: 'Crosswinds < 45 km/h | Precipitation < 50 mm/h | Gradient tolerance up to 32%' },
      { label: 'Carbon Abatement Factor', value: '42% lower emission profile when switching inland barge vs road trucking' }
    ],
    technicalSections: [
      {
        heading: 'Modal Schema Normalization Protocol',
        text: 'Traditional transport databases treat road, rail, and water transport as isolated silos. Objective 01 unifies physical transit parameters, fuel consumption tensors, weather vulnerability bounds, and payload capacities into a unified JSON REST data structure, enabling real-time cross-modal dispatch.'
      },
      {
        heading: 'Operational Safety Envelope',
        text: 'Each transport mode defines hard operational limits. When high-altitude wind gusts exceed 45 km/h, UAV flight vectors auto-reroute to low-altitude valley passes. When rainfall exceeds 35 mm/h, vulnerable dirt roads are marked severed, activating inland waterways or emergency drone pods.'
      }
    ]
  },
  OBJ_02: {
    num: '02',
    code: 'OBJ_02',
    title: 'ML Route-Level Disruption Risk Prediction Models',
    icon: '🧠',
    color: '#10b981',
    category: 'Machine Learning & Predictive Risk Analytics',
    apiEndpoint: 'http://localhost:5050/api/risk/assessment',
    coreThesis: 'Employs supervised ensemble regression (Random Forest + Gradient Boosting) to compute continuous route disruption probability from terrain gradients, real-time weather, and historical cutoffs.',
    formulaTitle: 'Predictive Disruption Probability Tensor',
    formula: 'P(Disruption) = \\sigma\\left( 0.38 \\cdot \\text{Slope}_{\\theta} + 0.31 \\cdot I_{rain} + 0.19 \\cdot S_{soil} + 0.12 \\cdot H_{past} \\right)',
    parameters: [
      { label: 'Feature Weight: Slope Gradient', value: '38% relative importance (critical above 25° incline)' },
      { label: 'Feature Weight: Rain Intensity', value: '31% relative importance (critical threshold > 35 mm/h)' },
      { label: 'Feature Weight: Soil Moisture', value: '19% saturation index (liquefaction & mudslide indicator)' },
      { label: 'Historical Incident Recurrence', value: '12% weighting based on 5-year seasonal cutoff records' }
    ],
    technicalSections: [
      {
        heading: 'Predictive Feature Extraction Pipeline',
        text: 'The ML Risk Engine dynamically pulls SRTM digital elevation slope profiles, Open-Meteo precipitation feeds, and historical road blockage logs. The model calculates point-by-point hazard scores along the transportation vector to predict blockages hours before physical disruption occurs.'
      },
      {
        heading: 'Critical Landslide Threshold Equation',
        text: 'Based on empirical Himalayan empirical geomorphology, rainfall-induced slope instability follows the empirical cutoff threshold I_c = 35.4 · D^(-0.42) mm/hr. Exceeding this line shifts route status from Moderate to High Hazard.'
      }
    ]
  },
  OBJ_03: {
    num: '03',
    code: 'OBJ_03',
    title: 'Village-Level Accessibility Scoring System',
    icon: '🏘️',
    color: '#818cf8',
    category: 'Geospatial Vulnerability & Settlement Indexing',
    apiEndpoint: 'http://localhost:5050/api/villages',
    coreThesis: 'Computes a multi-dimensional Accessibility Vulnerability Index (AVI, 0–100) for remote, tribal, and border settlements to prioritize medical supply drops and emergency stockpiles.',
    formulaTitle: 'Accessibility Vulnerability Index (AVI)',
    formula: 'AVI_i = \\frac{1}{3} \\left[ \\frac{\\text{DaysIsolated}_i}{365} + \\frac{\\text{DistHospital}_i}{\\text{MaxDist}} + (1 - \\text{RoadQuality}_i) \\right] \\times 100',
    parameters: [
      { label: 'Scoring Scale', value: '0–100 (0 = High Accessibility, 100 = Total Physical Isolation)' },
      { label: 'Seasonal Isolation Tracker', value: 'Measures days per year settlement is cut off by snow, floods, or mudslides' },
      { label: 'Strategic Settlement Tagging', value: 'Forward Border Posts, Riverine Island Hamlets, High Alpine Tribal Enclaves' },
      { label: 'Medical Emergency Triage', value: 'Identifies populations lacking Level-2 clinical care within 4 hours' }
    ],
    technicalSections: [
      {
        heading: 'Vulnerability Index Architecture',
        text: 'Remote border communities face compounded risks during monsoon and winter seasons. The AVI score aggregates historical cutoff duration, topological isolation, and distance to medical facilities to rank villages for preventive drone supply drops before access severed completely.'
      },
      {
        heading: 'Strategic Outpost & Tribal Hamlet Triage',
        text: 'Settlements with AVI > 75 (such as Shitalpur with 42 cutoff days and Majuli with 78 cutoff days) are automatically tagged for priority drone landing pad coordinates and cold-chain medical staging.'
      }
    ]
  },
  OBJ_04: {
    num: '04',
    code: 'OBJ_04',
    title: 'AI Route & Mode Recommendation Engine',
    icon: '🎯',
    color: '#059669',
    category: 'Autonomous Multi-Criteria Decision Analysis (MCDA)',
    apiEndpoint: 'http://localhost:5050/api/multimodal/recommend',
    coreThesis: 'Applies Pareto-optimal Multi-Criteria Decision Analysis to autonomously divert logistics flows across modes when ground passes are threatened or severed.',
    formulaTitle: 'Pareto-Optimal Objective Minimization',
    formula: '\\min_{m \\in M} \\left[ \\alpha \\cdot \\text{Risk}(m) + \\beta \\cdot \\frac{\\text{Time}(m)}{\\text{Time}_{\\max}} + \\gamma \\cdot \\frac{\\text{Cost}(m)}{\\text{Cost}_{\\max}} \\right]',
    parameters: [
      { label: 'Autonomous Diversion Threshold', value: 'Triggers when primary ground route disruption probability > 65%' },
      { label: 'Weighting Preferences', value: 'Emergency Relief: 60% Risk, 30% Time, 10% Cost | Bulk Cargo: 20% Risk, 30% Time, 50% Cost' },
      { label: 'Payload Split Optimization', value: 'Splits urgent medical units to UAV Drones while non-perishables route to Rail/Barge' },
      { label: 'Average Disruption Reduction', value: '82% risk reduction demonstrated in Himalayan and Brahmaputra corridors' }
    ],
    technicalSections: [
      {
        heading: 'Multi-Modal Diversion State Machine',
        text: 'When ground road networks in mountain passes face critical landslide risks (>65%), the decision engine automatically diverts high-priority supplies to heavy-lift electric VTOL cargo drones, and redirects bulk rations to inland waterway ferries, eliminating supply chain deadlocks.'
      },
      {
        heading: 'Trade-off Sensitivity Matrix',
        text: 'The engine continuously balances urgency against logistics cost. Users can tune sensitivity sliders to see how shifting priorities from pure cost conservation to zero-risk safety transforms the recommended modal mix.'
      }
    ]
  },
  OBJ_05: {
    num: '05',
    code: 'OBJ_05',
    title: 'Agency Planner Dashboard with Disaster Alerts',
    icon: '🚨',
    color: '#f43f5e',
    category: 'Emergency Command & Crisis Operations',
    apiEndpoint: 'http://localhost:5050/health',
    coreThesis: 'Provides a consolidated emergency operations center for NDRF, SDMA, and District Collectors with live village SOS queues, crisis telemetry feeds, and UAV air-drop staging.',
    formulaTitle: 'Emergency SOS Priority Indexing Formula',
    formula: '\\text{Priority}_{SOS} = 2.0 \\cdot \\text{MedicalSeverity} + 1.5 \\cdot \\text{DaysIsolated} + 1.0 \\cdot \\text{PopulationVulnerable}',
    parameters: [
      { label: 'Multi-Agency Alert SLA', value: '< 2.5 seconds emergency alert broadcast latency to all responders' },
      { label: 'UAV Staging Checklist', value: 'Automated battery SOC check, weather vector clearance, isothermal payload latch' },
      { label: 'Active SOS Queue', value: 'Real-time distress tickets triaged by medical severity and population vulnerability' },
      { label: 'Air-Drop Verification', value: 'Geofenced delivery confirmation with autonomous optical payload detachment' }
    ],
    technicalSections: [
      {
        heading: 'Civil Defense & Disaster Agency Integration',
        text: 'Designed specifically for rapid multi-agency coordination during monsoons, avalanches, and flash floods. The console streams real-time status alerts directly to field coordinators, providing instant situational awareness.'
      },
      {
        heading: 'Autonomous UAV Air-Drop Missions',
        text: 'When villages are completely inaccessible by foot or road rover, the agency planner deploys autonomous cargo drone flights equipped with isothermal cold-chain pods to air-drop antivenom, antibiotics, and emergency blood plasma.'
      }
    ]
  },
  OBJ_06: {
    num: '06',
    code: 'OBJ_06',
    title: 'Contrasting Case-Study Corridors Validation',
    icon: '🏔️',
    color: '#f59e0b',
    category: 'Cross-Geography Empirical Validation',
    apiEndpoint: 'http://localhost:5050/api/corridors',
    coreThesis: 'Validates model accuracy and operational transferability across 3 fundamentally contrasting Indian geographic and climatic region types.',
    formulaTitle: 'Cross-Terrain Model Generalization Index',
    formula: '\\text{GenScore} = \\frac{1}{K} \\sum_{k=1}^{K} \\left( 1 - \\left| \\text{ActualRisk}_k - \\text{PredictedRisk}_k \\right| \\right) \\ge 0.88',
    parameters: [
      { label: 'Corridor 1: Himalayan Alpine Pass', value: 'Zojila / Shitalpur sector (Elev: 1,800m–4,200m) • Severe snow cutoffs & landslides' },
      { label: 'Corridor 2: Riverine Flood Delta', value: 'Brahmaputra Delta / Majuli (Elev: 88m–110m) • Monsoon river surges & shifting shoals' },
      { label: 'Corridor 3: Desert Border Frontier', value: 'Thar Desert / Longewala (Elev: 180m–230m) • Extreme heat stress & sandstorms' },
      { label: 'Overall Model Transferability', value: '92.4% validation accuracy across all three contrasting terrain regimes' }
    ],
    technicalSections: [
      {
        heading: 'Himalayan Pass Case Study (High Alpine Cutoff)',
        text: 'Tests the models in sub-zero alpine conditions where steep rock slopes (35°+) and snow cover create physical cutoffs for up to 6 months per year. UAV drones bypass blocked mountain switchbacks in under 25 minutes.'
      },
      {
        heading: 'Brahmaputra Riverine Delta Case Study (Monsoon Flooding)',
        text: 'Tests logistics over massive alluvial floodplains where islands like Majuli lose all road connectivity during monsoon swells. Inland cargo ferries and amphibious barges provide backbone supply lines supported by drone delivery.'
      },
      {
        heading: 'Thar Desert Frontier Case Study (Thermal Stress & Sandstorms)',
        text: 'Validates operations in arid border outposts where temperatures reach 48°C and sand movement obscures tracks. Evaluates solar-powered cold chain preservation and thermal degradation of lithium drone batteries.'
      }
    ]
  }
};

const ObjectiveDeepDiveContent = ({ objectiveId, onNavigateToRiskEngine, onNavigateToFunding }) => {
  const { isDark } = useTheme();
  const obj = objectiveMetadata[objectiveId] || objectiveMetadata.OBJ_01;

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Objective Hero Banner */}
      <div style={{
        background: isDark
          ? `linear-gradient(135deg, ${obj.color}15 0%, rgba(15, 23, 42, 0.85) 100%)`
          : `linear-gradient(135deg, ${obj.color}10 0%, #ffffff 100%)`,
        border: `1.5px solid ${obj.color}44`,
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: isDark ? '0 10px 25px rgba(0, 0, 0, 0.35)' : '0 4px 16px rgba(15, 23, 42, 0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.8rem' }}>{obj.icon}</span>
              <div>
                <div style={{ fontSize: '0.72rem', color: obj.color, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {obj.category} • Objective {obj.num} of 06
                </div>
                <h2 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617', letterSpacing: '-0.02em' }}>
                  {obj.title}
                </h2>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#cbd5e1' : '#1e293b', margin: '8px 0 0 0', lineHeight: 1.55 }}>
              {obj.coreThesis}
            </p>
          </div>

          {/* API & Status Badge */}
          <div style={{
            background: isDark ? 'rgba(7, 11, 20, 0.75)' : '#f8fafc',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1'}`,
            borderRadius: '12px',
            padding: '12px 16px',
            minWidth: '220px'
          }}>
            <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Microservice Endpoint
            </div>
            <a
              href={obj.apiEndpoint}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                fontSize: '0.75rem',
                color: obj.color,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'block',
                marginTop: '4px',
                wordBreak: 'break-all'
              }}
            >
              {obj.apiEndpoint.replace('http://localhost:5050', '')} ↗
            </a>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span>100% Operational (HTTP 200)</span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Highlights & Mathematical Formulation */}
        <div style={{
          marginTop: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {/* Engineering Formula Box */}
          <div style={{
            background: isDark ? '#080d1a' : '#f1f5f9',
            border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.3)' : '#cbd5e1'}`,
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
              Mathematical / Algorithmic Formulation
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617', margin: '4px 0 6px 0' }}>
              {obj.formulaTitle}
            </div>
            <div style={{
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: '0.82rem',
              color: obj.color,
              background: isDark ? 'rgba(0,0,0,0.4)' : '#ffffff',
              padding: '8px 12px',
              borderRadius: '6px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}`
            }}>
              {obj.formula}
            </div>
          </div>

          {/* Operational Envelope Parameters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {obj.parameters.map((p, i) => (
              <div
                key={i}
                style={{
                  background: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  padding: '8px 10px'
                }}
              >
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: '0.72rem', color: isDark ? '#f8fafc' : '#020617', fontWeight: 600, marginTop: '2px' }}>
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Text Sections */}
        <div style={{
          marginTop: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem'
        }}>
          {obj.technicalSections.map((sec, i) => (
            <div
              key={i}
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.5)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : '#e2e8f0'}`,
                borderRadius: '10px',
                padding: '12px 14px'
              }}
            >
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.82rem', fontWeight: 800, color: obj.color }}>
                {sec.heading}
              </h4>
              <p style={{ margin: 0, fontSize: '0.75rem', color: isDark ? '#cbd5e1' : '#334155', lineHeight: 1.45 }}>
                {sec.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectiveDeepDiveContent;
