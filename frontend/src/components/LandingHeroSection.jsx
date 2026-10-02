import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LandingHeroSection = ({ onNavigateToDashboard, onNavigateToRiskEngine, onNavigateToFunding, onNavigateToHelpdesk }) => {
  const { isDark } = useTheme();

  return (
    <section style={{
      padding: '2.5rem 2rem 3rem 2rem',
      maxWidth: '1360px',
      margin: '0 auto',
      position: 'relative'
    }}>
      {/* TWO COLUMN HERO LAYOUT (Matching Image 1) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
        <div>
          {/* Pill Badge (matching Image 1) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: isDark ? 'rgba(56, 189, 248, 0.12)' : '#e0f2fe',
            border: `1px solid ${isDark ? 'rgba(56, 189, 248, 0.3)' : '#bae6fd'}`,
            color: isDark ? '#38bdf8' : '#0369a1',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '1.25rem',
            letterSpacing: '0.02em'
          }}>
            <span>⚙️</span>
            <span>AI-Native Multi-Modal Logistics Platform</span>
          </div>

          {/* Large Bold Headline with Artistic Brush Underline */}
          <h1 style={{
            fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: isDark ? '#f8fafc' : '#0f172a',
            margin: '0 0 1.25rem 0'
          }}>
            Simplify Rural & Disaster Logistics Operations with{' '}
            <span style={{ position: 'relative', display: 'inline-block', color: isDark ? '#38bdf8' : '#0284c7' }}>
              AI-Logix
              {/* Hand-drawn brush underline curve matching Image 1 */}
              <svg
                viewBox="0 0 200 18"
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: '-8px',
                  width: '100%',
                  height: '14px',
                  overflow: 'visible'
                }}
              >
                <path
                  d="M 5,12 Q 100,-2 195,10"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading Lead Text */}
          <p style={{
            fontSize: '1.08rem',
            fontWeight: 700,
            lineHeight: 1.5,
            color: isDark ? '#cbd5e1' : '#1e3a8a',
            margin: '0 0 1rem 0'
          }}>
            Instant multi-modal route optimization, ML disruption risk prediction, village accessibility triage, emergency UAV dispatch, and real-time GIS telemetry—all in one unified platform.
          </p>

          {/* Descriptive Body Paragraph */}
          <p style={{
            fontSize: '0.92rem',
            lineHeight: 1.6,
            color: isDark ? '#94a3b8' : '#475569',
            margin: '0 0 1.75rem 0'
          }}>
            AI-Logix automates emergency supply chains, powers predictive risk models, coordinates multi-agency disaster response, and ensures life-saving delivery across cutoff Himalayan passes and flood-isolated river islands using predictive machine learning and autonomous multimodal dispatch.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={onNavigateToDashboard}
              style={{
                background: '#1e3a8a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(30, 58, 138, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1e3a8a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>🚀</span>
              <span>Launch Operations Dashboard</span>
            </button>

            <button
              onClick={onNavigateToFunding}
              style={{
                background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
                color: isDark ? '#34d399' : '#047857',
                border: `1.5px solid ${isDark ? 'rgba(16, 185, 129, 0.4)' : '#a7f3d0'}`,
                borderRadius: '10px',
                padding: '12px 20px',
                fontSize: '0.92rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#059669';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5';
                e.currentTarget.style.color = isDark ? '#34d399' : '#047857';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>❤️</span>
              <span>Fund Medical Supplies</span>
            </button>

            <button
              onClick={onNavigateToRiskEngine}
              style={{
                background: 'transparent',
                color: isDark ? '#94a3b8' : '#475569',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'}`,
                borderRadius: '10px',
                padding: '12px 18px',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#0284c7';
                e.currentTarget.style.color = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1';
                e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569';
              }}
            >
              <span>🧠</span>
              <span>ML Risk Engine</span>
            </button>
          </div>

          {/* Trust points / feature tags */}
          <div style={{
            display: 'flex',
            gap: '18px',
            flexWrap: 'wrap',
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: isDark ? '#94a3b8' : '#64748b'
          }}>
            <span>✔ All 6 Objectives Integrated</span>
            <span>✔ 4 Transport Modalities (Road, Rail, River, Drone)</span>
            <span>✔ 94.2% Route Reliability</span>
          </div>
        </div>

        {/* RIGHT COLUMN: HERO SHOWCASE CARD (Matching Image 1) */}
        <div>
          <div style={{
            background: isDark ? '#0f172a' : '#ffffff',
            borderRadius: '18px',
            border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.35)' : '#cbd5e1'}`,
            boxShadow: isDark
              ? '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)'
              : '0 20px 45px -10px rgba(15, 23, 42, 0.15), 0 4px 15px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Dark Blue Header Banner (matching Image 1 "Maintenance Done") */}
            <div style={{
              background: '#0a192f',
              color: '#ffffff',
              padding: '10px 18px',
              fontSize: '0.84rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textAlign: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>🛰️</span>
              <span>Disaster Relief Dispatch Active • Route Verified</span>
            </div>

            {/* Image Container with Floating Overlays */}
            <div style={{ position: 'relative', overflow: 'hidden', height: '320px', background: '#000' }}>
              <img
                src="/images/logistics_hero_dispatch.jpg"
                alt="Humanitarian relief responders deploying medical cargo drone in mountainous terrain"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Floating Status Pill (matching Image 1 "Pump #7 — Repair Complete") */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                padding: '8px 14px',
                border: '1.5px solid #10b981',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 900
                }}>
                  ✓
                </span>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#020617', lineHeight: 1.2 }}>
                    Flight #UAV-042 — Medical Air-Drop Complete
                  </div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#047857' }}>
                    System back online • Shitalpur cutoff prevented
                  </div>
                </div>
              </div>

              {/* Real-time telemetry badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(9, 13, 22, 0.85)',
                color: '#38bdf8',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.7rem',
                fontWeight: 800,
                border: '1px solid rgba(56, 189, 248, 0.4)',
                letterSpacing: '0.04em'
              }}>
                LIVE TELEMETRY
              </div>
            </div>

            {/* Bottom Metrics Bar with 3 Colored Badges (matching Image 1 "6.2 hrs saved | 62% less downtime | $4,200 saved") */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              background: '#ffffff',
              borderTop: '1px solid #cbd5e1'
            }}>
              {/* Metric 1 */}
              <div style={{
                padding: '12px 10px',
                textAlign: 'center',
                borderRight: '1px solid #e2e8f0',
                background: '#fff7ed'
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#c2410c' }}>
                  4.8 hrs
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
                  Saved in transit
                </div>
              </div>

              {/* Metric 2 */}
              <div style={{
                padding: '12px 10px',
                textAlign: 'center',
                borderRight: '1px solid #e2e8f0',
                background: '#f0fdf4'
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#15803d' }}>
                  94.2%
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                  Risk Mitigated
                </div>
              </div>

              {/* Metric 3 */}
              <div style={{
                padding: '12px 10px',
                textAlign: 'center',
                background: '#eff6ff'
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#1d4ed8' }}>
                  ₹35,000
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase' }}>
                  Relief Dispatched
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK FEATURE LAUNCH STRIP (Making everything feasible and easy to access) */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        borderRadius: '16px',
        background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(79, 110, 165, 0.3)' : '#cbd5e1'}`,
        boxShadow: isDark ? '0 10px 25px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(15, 23, 42, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: isDark ? '#f8fafc' : '#020617' }}>
              ⚡ Quick Access Command Terminal
            </div>
            <div style={{ fontSize: '0.74rem', color: isDark ? '#94a3b8' : '#64748b' }}>
              Directly assess any logistics module, risk prediction engine, or community relief tool
            </div>
          </div>
          <button
            onClick={onNavigateToDashboard}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#0284c7',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Open All 6 Objectives in Master Dashboard</span>
            <span>→</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px'
        }}>
          {[
            {
              title: '1. Master Multi-Modal Dashboard',
              desc: 'Inspect all 6 objectives sequentially or separated with live active alerts.',
              icon: '📊',
              action: onNavigateToDashboard,
              tag: 'Full 6 Objectives',
              color: '#0284c7'
            },
            {
              title: '2. ML Disruption Risk Engine',
              desc: 'Drag and drop location coordinates to analyze terrain, weather & cutoff hazards.',
              icon: '🧠',
              action: onNavigateToRiskEngine,
              tag: 'Interactive Map',
              color: '#10b981'
            },
            {
              title: '3. Fund Medical Relief Supplies',
              desc: 'Register as a donor/NGO and sponsor trauma kits, antivenom pods, or drone flights.',
              icon: '❤️',
              action: onNavigateToFunding,
              tag: 'Relief Sponsorship',
              color: '#f43f5e'
            },
            {
              title: '4. Doubts & Helpdesk Support',
              desc: 'Ask questions, review FAQs, and get instant doubt resolution from AI assistance.',
              icon: '💬',
              action: onNavigateToHelpdesk,
              tag: 'Live Doubts Hub',
              color: '#8b5cf6'
            }
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={card.action}
              style={{
                padding: '14px',
                borderRadius: '12px',
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = card.color;
                e.currentTarget.style.boxShadow = `0 6px 18px ${card.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
                  <span style={{
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: `${card.color}15`,
                    color: card.color,
                    border: `1px solid ${card.color}35`
                  }}>
                    {card.tag}
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isDark ? '#f8fafc' : '#020617', marginBottom: '4px' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '0.76rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.4 }}>
                  {card.desc}
                </div>
              </div>

              <div style={{
                marginTop: '12px',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: card.color,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>Open Terminal</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingHeroSection;
