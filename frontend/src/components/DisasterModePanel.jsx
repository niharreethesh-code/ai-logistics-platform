import React, { useState } from 'react';

const DisasterModePanel = ({ isDisasterMode, onToggleDisasterMode }) => {
  const [sosList, setSosList] = useState([
    {
      id: 'sos-1',
      village: 'Alpur Settlement',
      coordinates: '34.908°N, 73.015°E',
      type: 'Flash Flood Cutoff',
      severity: 'CRITICAL',
      needs: 'Emergency Insulin, Anti-Venom & Pediatric Antibiotics',
      status: 'In Flight (UAV-7 Parachute Drop)',
      eta: '12 mins'
    },
    {
      id: 'sos-2',
      village: 'Batagram Highland',
      coordinates: '34.821°N, 73.045°E',
      type: 'Road Landslide Obstruction',
      severity: 'HIGH',
      needs: 'Potable Water Purification Kits & MRE Rations (150 units)',
      status: 'Assigned to 6x6 Amphibious Vehicle RV-1',
      eta: '38 mins'
    }
  ]);

  const [notification, setNotification] = useState(null);

  const handleDeployUav = () => {
    setNotification('🚀 Emergency Cargo UAV dispatched! Parachute payload en route to Alpur flood zone.');
    setTimeout(() => setNotification(null), 5000);
  };

  const handleDeployAmphibious = () => {
    setNotification('🚜 6x6 Amphibious Rescue Vehicle RV-2 deployed with water treatment generator.');
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div style={{
      borderRadius: '16px',
      border: isDisasterMode ? '2px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.3)',
      background: isDisasterMode ? 'linear-gradient(180deg, rgba(69, 10, 10, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)' : 'rgba(18, 26, 47, 0.75)',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: isDisasterMode ? '0 0 35px rgba(239, 68, 68, 0.25)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Header with Emergency Mode Switch */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: isDisasterMode ? '#ef4444' : '#7f1d1d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            boxShadow: isDisasterMode ? '0 0 20px #ef4444' : 'none'
          }}>
            🚨
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                Objective 05: Disaster Management & Agency Alert Center
              </h3>
              <span style={{
                background: isDisasterMode ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {isDisasterMode ? 'CRISIS STATE ACTIVE' : 'STANDBY READY'}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Dedicated command interface for NDRF, SDMA, District Collectors & Relief Agencies
            </span>
          </div>
        </div>

        <button
          onClick={onToggleDisasterMode}
          style={{
            background: isDisasterMode ? '#ef4444' : 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#fff',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: isDisasterMode ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{isDisasterMode ? '🔴 Deactivate Crisis Mode' : '⚠️ Activate Disaster Mode'}</span>
        </button>
      </div>

      {notification && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          padding: '10px 14px',
          color: '#fee2e2',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          {notification}
        </div>
      )}

      {/* Disaster Imagery & Satellite Map Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
        gap: '1.25rem',
        alignItems: 'start'
      }}>
        {/* Real Visual Image from Public Assets */}
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          height: '320px',
          background: '#090d16'
        }}>
          <img
            src="/images/disaster_relief.jpg"
            alt="Disaster Management Response and Drone Air-Drop"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px 16px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.95) 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: '#f8fafc'
          }}>
            <div>
              <strong style={{ color: '#ef4444' }}>🔴 LIVE SATELLITE HUD:</strong> Heavy-lift UAV dropping parachute supplies to Alpur flood settlement.
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Oper: Flood-Resp 2026</span>
          </div>
        </div>

        {/* Real-time SOS & Crisis Response Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '1rem'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f87171', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active SOS Requests from Cutoff Villages
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {sosList.map((sos) => (
                <div
                  key={sos.id}
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#f8fafc' }}>{sos.village}</strong>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.7rem' }}>{sos.severity}</span>
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.75rem', marginTop: '2px' }}>
                    Needs: {sos.needs}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                    <span>{sos.status}</span>
                    <span style={{ color: '#38bdf8' }}>ETA: {sos.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Relief Dispatch Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleDeployUav}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                color: '#fff',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)'
              }}
            >
              🛸 Launch UAV Air-Drop
            </button>
            <button
              onClick={handleDeployAmphibious}
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              🚜 Deploy 6x6 Amphibious
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterModePanel;
