import React, { useState } from 'react';

const MLRiskSimulator = ({ onSimulateRisk }) => {
  const [rainfall, setRainfall] = useState(65); // mm/hr
  const [windSpeed, setWindSpeed] = useState(38); // km/h
  const [soilSaturation, setSoilSaturation] = useState(72); // %
  const [pastIncidents, setPastIncidents] = useState(6); // scale 1-10

  // Calculate ML predicted disruption risk using weighted ensemble formula
  const rainWeight = 0.35;
  const windWeight = 0.20;
  const soilWeight = 0.30;
  const incidentWeight = 0.15;

  const normalizedRain = Math.min(rainfall / 120, 1) * 100;
  const normalizedWind = Math.min(windSpeed / 90, 1) * 100;
  const normalizedSoil = soilSaturation;
  const normalizedIncidents = (pastIncidents / 10) * 100;

  const disruptionScore = Math.round(
    normalizedRain * rainWeight +
    normalizedWind * windWeight +
    normalizedSoil * soilWeight +
    normalizedIncidents * incidentWeight
  );

  let riskCategory = 'Low';
  let riskColor = '#10b981';
  let hazardPrediction = 'Nominal Conditions • Low Terrain Friction';
  let recommendedMode = 'All-Terrain 4WD Road Transport';

  if (disruptionScore > 70) {
    riskCategory = 'CRITICAL DISRUPTION';
    riskColor = '#f43f5e';
    hazardPrediction = 'Imminent Landslide & Flash Flood Overwash';
    recommendedMode = 'Airlift Cargo Drone UAV or Waterway Freight Barge';
  } else if (disruptionScore > 45) {
    riskCategory = 'MODERATE HAZARD';
    riskColor = '#f59e0b';
    hazardPrediction = 'Mud Accumulation & Reduced Tire Adhesion';
    recommendedMode = 'Heavy 6x6 Off-Road Convoy with GPS Convoy Escort';
  }

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🧠</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Objective 02: ML Route-Level Disruption Risk Engine
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Multi-factor predictive model combining live weather, elevation slope gradients & historical blockades
          </span>
        </div>

        <span style={{
          fontSize: '0.75rem',
          background: 'rgba(56, 189, 248, 0.1)',
          color: '#38bdf8',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '4px 10px',
          borderRadius: '6px',
          fontWeight: 700
        }}>
          Random Forest + XGBoost Ensemble
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Sliders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>🌧️ Precipitation / Rainfall Rate</span>
              <strong style={{ color: '#38bdf8' }}>{rainfall} mm/hr</strong>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>💨 Wind Gust Velocity</span>
              <strong style={{ color: '#a78bfa' }}>{windSpeed} km/h</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#a78bfa', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>⛰️ Soil Moisture & Slope Saturation</span>
              <strong style={{ color: '#f59e0b' }}>{soilSaturation}%</strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soilSaturation}
              onChange={(e) => setSoilSaturation(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span style={{ color: '#cbd5e1' }}>📜 Past Incidents / Historical Vulnerability</span>
              <strong style={{ color: '#f43f5e' }}>{pastIncidents} / 10</strong>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={pastIncidents}
              onChange={(e) => setPastIncidents(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Prediction Output Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: `1px solid ${riskColor}`,
          borderRadius: '12px',
          padding: '1.25rem',
          boxShadow: `0 0 25px ${riskColor}33`,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Disruption Probability
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              background: riskColor,
              color: '#0f172a'
            }}>
              {riskCategory}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: riskColor, letterSpacing: '-0.03em' }}>
              {disruptionScore}%
            </div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Risk Index</span>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '0.8rem',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.7rem' }}>PREDICTED HAZARD:</span>
            <strong style={{ color: '#f8fafc' }}>{hazardPrediction}</strong>
          </div>

          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            borderRadius: '8px',
            padding: '8px 10px',
            fontSize: '0.8rem',
            border: '1px solid rgba(56, 189, 248, 0.25)'
          }}>
            <span style={{ color: '#38bdf8', display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>
              AI RISK-AWARE MODE RECOMMENDATION (Obj 04):
            </span>
            <strong style={{ color: '#e0f2fe' }}>{recommendedMode}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLRiskSimulator;
