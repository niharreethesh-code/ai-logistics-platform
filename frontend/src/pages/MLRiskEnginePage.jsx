import React, { useState, useEffect } from 'react';
import { recommendMode } from '../services/api';

const coordinatePresets = [
  {
    id: 'srinagar',
    name: 'Srinagar Central Staging Depot',
    type: 'Origin Hub',
    lat: 34.083,
    lng: 74.797,
    elevation: 1585,
    terrain: 'Valley Basin',
    icon: '🏢',
    canvasX: 160,
    canvasY: 280
  },
  {
    id: 'zojila',
    name: 'Zojila Mountain Pass (Way-1)',
    type: 'Hazard Waypoint',
    lat: 34.280,
    lng: 75.210,
    elevation: 3528,
    terrain: 'High Alpine Ridge',
    icon: '🏔️',
    canvasX: 380,
    canvasY: 150
  },
  {
    id: 'shitalpur',
    name: 'Shitalpur Strategic Border Post',
    type: 'Destination Settlement',
    lat: 34.908,
    lng: 73.015,
    elevation: 3120,
    terrain: 'Steep Cliffside',
    icon: '📍',
    canvasX: 650,
    canvasY: 110
  },
  {
    id: 'dibrugarh',
    name: 'Dibrugarh Riverine Base Depot',
    type: 'Origin Hub',
    lat: 27.472,
    lng: 94.912,
    elevation: 108,
    terrain: 'Alluvial Plains',
    icon: '🏢',
    canvasX: 180,
    canvasY: 340
  },
  {
    id: 'majuli',
    name: 'Majuli Island Settlement',
    type: 'Destination Settlement',
    lat: 26.920,
    lng: 94.210,
    elevation: 88,
    terrain: 'Monsoon Floodplain',
    icon: '🏝️',
    canvasX: 620,
    canvasY: 360
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer Desert Logistics Outpost',
    type: 'Origin Hub',
    lat: 26.915,
    lng: 70.908,
    elevation: 225,
    terrain: 'Arid Dune Plain',
    icon: '🏢',
    canvasX: 190,
    canvasY: 230
  },
  {
    id: 'longewala',
    name: 'Longewala Border Settlement',
    type: 'Destination Settlement',
    lat: 27.525,
    lng: 70.155,
    elevation: 190,
    terrain: 'Desert Border Frontier',
    icon: '🏜️',
    canvasX: 660,
    canvasY: 220
  }
];

const MLRiskEnginePage = () => {
  // Coordinates State
  const [origin, setOrigin] = useState(coordinatePresets[0]);
  const [destination, setDestination] = useState(coordinatePresets[2]);
  const [draggedPreset, setDraggedPreset] = useState(null);

  // Weather & Mission Parameters
  const [liveRainfall, setLiveRainfall] = useState(45);
  const [liveWindSpeed, setLiveWindSpeed] = useState(32);
  const [payloadKg, setPayloadKg] = useState(85);

  // Simulation State
  const [isSimulatingDispatch, setIsSimulatingDispatch] = useState(false);
  const [dispatchProgress, setDispatchProgress] = useState(0);
  const [dispatchLogs, setDispatchLogs] = useState([]);

  // Computed Stats
  const [distanceKm, setDistanceKm] = useState(128);
  const [elevationDelta, setElevationDelta] = useState(1535);
  const [slopeGradient, setSlopeGradient] = useState(18.4);
  const [disruptionRiskScore, setDisruptionRiskScore] = useState(68);
  const [riskCategory, setRiskCategory] = useState('High');

  // Efficient Approach Recommendation
  const [optimalApproach, setOptimalApproach] = useState({
    mode: 'Cargo Drone (UAV)',
    icon: '🛸',
    time: '1h 12m',
    timeSaved: '4h 18m',
    cost: '₹1,240',
    riskMitigation: '81%',
    carbonG: '18g / t-km',
    routeWaypoints: ['Srinagar Depot', 'Air Corridor Bravo', 'Shitalpur Border Outpost'],
    rationale: 'Severe 72% landslide hazard detected on road passes. Autonomous Cargo Drone completely bypasses high-altitude cliffside blockades and cuts delivery duration by over 4 hours.'
  });

  // Calculate distance & terrain stats whenever origin or destination changes
  useEffect(() => {
    if (!origin || !destination) return;

    // Approximate Euclidean / Haversine distance in KM
    const dLat = (destination.lat - origin.lat) * 111;
    const dLng = (destination.lng - origin.lng) * 111 * Math.cos((origin.lat * Math.PI) / 180);
    const rawDist = Math.sqrt(dLat * dLat + dLng * dLng);
    const dist = Math.max(35, Math.round(rawDist * 1.3)); // terrain winding factor
    const elevDelta = Math.abs(destination.elevation - origin.elevation);
    const slope = Math.min(35, Number(((elevDelta / (dist * 1000)) * 100).toFixed(1)));

    setDistanceKm(dist);
    setElevationDelta(elevDelta);
    setSlopeGradient(slope);

    // Compute ML Disruption Risk Probability
    // Formula: Risk = (Slope * 1.5) + (Rainfall * 0.45) + (Wind * 0.25)
    let rawRisk = Math.round((slope * 1.4) + (liveRainfall * 0.45) + (liveWindSpeed * 0.25));
    if (rawRisk > 95) rawRisk = 95;
    if (rawRisk < 12) rawRisk = 12;

    setDisruptionRiskScore(rawRisk);
    const category = rawRisk >= 60 ? 'High' : rawRisk >= 35 ? 'Moderate' : 'Low';
    setRiskCategory(category);

    // Determine Optimal Efficient Approach
    if (rawRisk >= 50 && payloadKg <= 150) {
      setOptimalApproach({
        mode: 'Autonomous Cargo Drone (UAV)',
        icon: '🛸',
        time: `${Math.max(1, Math.round((dist / 95) * 10) / 10)}h`,
        timeSaved: `${Math.max(2, Math.round((dist / 35 - dist / 95) * 10) / 10)}h`,
        cost: `₹${Math.round(dist * 0.75 * payloadKg)}`,
        riskMitigation: `${Math.round(rawRisk * 0.85)}%`,
        carbonG: '18g / t-km',
        routeWaypoints: [origin.name, 'Waypoint Alpha Airway', destination.name],
        rationale: `Ground pass subject to ${rawRisk}% disruption risk. Autonomous UAV bypasses rugged cliffside terrain, eliminating ground vehicle stranding.`
      });
    } else if (origin.terrain.includes('River') || destination.terrain.includes('Flood') || destination.terrain.includes('Island')) {
      setOptimalApproach({
        mode: 'Inland River Freight Barge',
        icon: '⛴️',
        time: `${Math.max(2, Math.round((dist / 24) * 10) / 10)}h`,
        timeSaved: '2h 15m',
        cost: `₹${Math.round(dist * 0.06 * payloadKg)}`,
        riskMitigation: `${Math.round(rawRisk * 0.75)}%`,
        carbonG: '24g / t-km',
        routeWaypoints: [origin.name, 'National Waterway-2 Basin', destination.name],
        rationale: 'Road infrastructure flooded by monsoon surge. Shallow-draft river barge delivers high payload resilience with lowest unit freight cost.'
      });
    } else {
      setOptimalApproach({
        mode: 'All-Terrain 4WD Ground Truck',
        icon: '🚚',
        time: `${Math.max(2, Math.round((dist / 45) * 10) / 10)}h`,
        timeSaved: 'Direct Route',
        cost: `₹${Math.round(dist * 0.28 * payloadKg)}`,
        riskMitigation: '45%',
        carbonG: '165g / t-km',
        routeWaypoints: [origin.name, 'National Highway Pass', destination.name],
        rationale: 'Terrain risk index is manageable. Direct ground road transit provides highest payload capacity and lowest dispatch friction.'
      });
    }
  }, [origin, destination, liveRainfall, liveWindSpeed, payloadKg]);

  // Drag and Drop handlers
  const handleDragStart = (preset) => {
    setDraggedPreset(preset);
  };

  const handleDropOnOrigin = (e) => {
    e.preventDefault();
    if (draggedPreset) {
      setOrigin(draggedPreset);
      setDraggedPreset(null);
    }
  };

  const handleDropOnDestination = (e) => {
    e.preventDefault();
    if (draggedPreset) {
      setDestination(draggedPreset);
      setDraggedPreset(null);
    }
  };

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert canvas click to pseudo coordinates
    const newTarget = {
      id: `custom-${Date.now()}`,
      name: `Dropped Target Pin (${Math.round(x)}, ${Math.round(y)})`,
      type: 'Custom Coordinate Pin',
      lat: Number((34.0 + (y / 400)).toFixed(3)),
      lng: Number((73.5 + (x / 400)).toFixed(3)),
      elevation: Math.round(1800 + (400 - y) * 4.5),
      terrain: y < 200 ? 'Alpine Ridge' : 'Valley Foothill',
      icon: '📍',
      canvasX: x,
      canvasY: y
    };

    setDestination(newTarget);
  };

  const handleSimulateExecution = () => {
    setIsSimulatingDispatch(true);
    setDispatchProgress(0);
    setDispatchLogs([
      `[00:00] Initialized Mission from ${origin.name} (${origin.lat}°N, ${origin.lng}°E)...`,
      `[00:01] Route-Level ML Engine computed risk profile: ${disruptionRiskScore}% (${riskCategory})`,
      `[00:02] Deployed ${optimalApproach.mode} via optimal trajectory.`
    ]);

    const interval = setInterval(() => {
      setDispatchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulatingDispatch(false);
          setDispatchLogs((logs) => [
            ...logs,
            `[01:12] Mission Accomplished: Payload safely delivered to ${destination.name} with 0 disruptions!`
          ]);
          return 100;
        }
        const next = prev + 25;
        if (next === 50) {
          setDispatchLogs((logs) => [
            ...logs,
            `[00:35] Traversing Waypoint Alpha. High-altitude sensors confirm clear passage.`
          ]);
        }
        if (next === 75) {
          setDispatchLogs((logs) => [
            ...logs,
            `[00:58] Descending toward ${destination.name}. Telemetry locked.`
          ]);
        }
        return next;
      });
    }, 900);
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
            background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)'
          }}>
            🧠
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              ML Route-Level Disruption Risk Engine
            </h1>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
              Objective 02 (Predictive Disruption Modeling) & Objective 04 (AI Route & Mode Optimization) • Drag & Drop Coordinates Sandbox
            </p>
          </div>
        </div>
      </div>

      {/* Top Banner: Drag and Drop Instructions */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.15) 0%, rgba(99, 102, 241, 0.12) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '12px',
        padding: '12px 18px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>👇</span>
          <span style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>
            <strong>Interactive Workflow:</strong> Drag coordinate location badges below into the <strong>Origin</strong> or <strong>Destination</strong> drop-zones, or click anywhere on the GIS Map to place custom coordinates. The ML engine will instantly compute disruption probabilities and implement the optimal transport approach.
          </span>
        </div>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          background: 'rgba(56, 189, 248, 0.2)',
          color: '#38bdf8',
          padding: '4px 10px',
          borderRadius: '20px',
          border: '1px solid rgba(56, 189, 248, 0.4)'
        }}>
          Live Terrain & Telemetry Sandbox
        </span>
      </div>

      {/* Draggable Coordinate Presets Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📍 Draggable Location Coordinates (Drag or Click to Assign)
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Grab a coordinate chip and drop it into Origin or Destination
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {coordinatePresets.map((preset) => (
            <div
              key={preset.id}
              draggable
              onDragStart={() => handleDragStart(preset)}
              onClick={() => {
                if (preset.id !== origin.id) setDestination(preset);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '10px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#f8fafc',
                cursor: 'grab',
                fontSize: '0.8rem',
                userSelect: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#38bdf8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{preset.icon}</span>
              <div>
                <strong style={{ display: 'block', fontSize: '0.82rem' }}>{preset.name}</strong>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {preset.lat}°N, {preset.lng}°E • Elev: {preset.elevation}m
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drag & Drop Coordinate Drop-Zones (Origin & Destination) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.25rem',
        marginBottom: '1.5rem'
      }}>
        {/* Origin Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnOrigin}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '2px dashed rgba(56, 189, 248, 0.5)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid #38bdf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem'
          }}>
            🏢
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Origin Depot Drop-Zone (Drag Here)
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
              {origin.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
              Coordinates: <strong>{origin.lat}°N, {origin.lng}°E</strong> • Elev: <strong>{origin.elevation}m</strong> ({origin.terrain})
            </div>
          </div>
        </div>

        {/* Destination Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnDestination}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '2px dashed rgba(244, 63, 94, 0.5)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid #f43f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem'
          }}>
            🎯
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.72rem', color: '#f43f5e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Target Destination Drop-Zone (Drag Here)
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
              {destination.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
              Coordinates: <strong>{destination.lat}°N, {destination.lng}°E</strong> • Elev: <strong>{destination.elevation}m</strong> ({destination.terrain})
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Section: Interactive GIS Canvas on left, ML Stats & Efficient Approach on right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        alignItems: 'start'
      }}>
        {/* Left: Interactive GIS SVG Canvas */}
        <div className="glass-panel" style={{ padding: '1.25rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                🗺️ Interactive Geospatial Route Canvas
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Click anywhere on canvas to set target pin • Live topographic contour mapping
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
              {distanceKm} km Corridor Span
            </span>
          </div>

          {/* SVG Canvas */}
          <div
            onClick={handleCanvasClick}
            style={{
              position: 'relative',
              width: '100%',
              height: '420px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'linear-gradient(180deg, #09101d 0%, #060911 100%)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              cursor: 'crosshair'
            }}
          >
            {/* Grid Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>

            <svg viewBox="0 0 800 480" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>

                <linearGradient id="droneFlyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>

                <filter id="canvasGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Contour Ridges */}
              <path d="M 40 100 Q 200 60 400 120 T 760 80" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" />
              <path d="M 30 220 Q 240 160 450 240 T 770 190" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" />
              <path d="M 50 350 Q 260 280 480 370 T 780 320" fill="none" stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.5" />

              {/* Connecting Ground Path (With Disruption Risk coloring) */}
              <line
                x1={origin.canvasX || 160}
                y1={origin.canvasY || 280}
                x2={destination.canvasX || 650}
                y2={destination.canvasY || 110}
                stroke={disruptionRiskScore > 60 ? '#f43f5e' : '#38bdf8'}
                strokeWidth="3"
                strokeDasharray="6 6"
                opacity="0.6"
              />

              {/* Optimal AI Air / Direct Approach Trajectory */}
              <path
                d={`M ${origin.canvasX || 160} ${origin.canvasY || 280} Q ${(origin.canvasX + destination.canvasX) / 2 || 400} ${Math.min(origin.canvasY, destination.canvasY) - 50 || 80} ${destination.canvasX || 650} ${destination.canvasY || 110}`}
                fill="none"
                stroke="url(#droneFlyGrad)"
                strokeWidth="4"
                className="route-flowing-line"
                filter="url(#canvasGlow)"
              />

              {/* Origin Marker */}
              <g transform={`translate(${origin.canvasX || 160}, ${origin.canvasY || 280})`}>
                <circle r="14" fill="#0284c7" filter="url(#canvasGlow)" />
                <circle r="6" fill="#fff" />
                <text x="18" y="5" fill="#f8fafc" fontSize="12" fontWeight="700">
                  {origin.name} (Origin)
                </text>
              </g>

              {/* Destination Marker */}
              <g transform={`translate(${destination.canvasX || 650}, ${destination.canvasY || 110})`}>
                <circle r="14" fill="#f43f5e" filter="url(#canvasGlow)" />
                <circle r="6" fill="#fff" />
                <text x="18" y="5" fill="#f8fafc" fontSize="12" fontWeight="700">
                  {destination.name} (Target)
                </text>
              </g>

              {/* Moving Vehicle / Drone Simulation Marker if active */}
              {isSimulatingDispatch && (
                <g transform={`translate(${(origin.canvasX || 160) + (((destination.canvasX || 650) - (origin.canvasX || 160)) * (dispatchProgress / 100))}, ${(origin.canvasY || 280) + (((destination.canvasY || 110) - (origin.canvasY || 280)) * (dispatchProgress / 100))})`}>
                  <circle r="18" fill="#10b981" filter="url(#canvasGlow)" opacity="0.8" />
                  <text x="-10" y="6" fontSize="16">{optimalApproach.icon}</text>
                </g>
              )}
            </svg>

            {/* Canvas Telemetry HUD Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
              color: '#cbd5e1'
            }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Distance:</span> <strong>{distanceKm} km</strong> • <span style={{ color: '#94a3b8' }}>Elevation Delta:</span> <strong>+{elevationDelta}m</strong> • <span style={{ color: '#94a3b8' }}>Mean Slope:</span> <strong>{slopeGradient}%</strong>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Target:</span> <strong>{destination.lat}°N, {destination.lng}°E</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Automated Stats Analysis & Disruption Risk Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Risk Metrics Breakdown Card */}
          <div className="glass-panel" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                📊 Analyzed Disruption Stats
              </h4>
              <span style={{
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800,
                background: disruptionRiskScore >= 60 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                color: disruptionRiskScore >= 60 ? '#fda4af' : '#fde68a',
                border: `1px solid ${disruptionRiskScore >= 60 ? '#f43f5e' : '#f59e0b'}`
              }}>
                {disruptionRiskScore}% Probability ({riskCategory} Disruption)
              </span>
            </div>

            {/* Telemetry Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.78rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#cbd5e1' }}>
                  <span>⛰️ Slope & Rockslide Vulnerability</span>
                  <strong style={{ color: '#f43f5e' }}>{Math.min(98, Math.round(slopeGradient * 3.2))}%</strong>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(98, Math.round(slopeGradient * 3.2))}%`, background: '#f43f5e' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#cbd5e1' }}>
                  <span>🌧️ Precipitation & Flash Flood Factor</span>
                  <strong style={{ color: '#38bdf8' }}>{Math.min(100, Math.round(liveRainfall * 0.9))}%</strong>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, Math.round(liveRainfall * 0.9))}%`, background: '#38bdf8' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#cbd5e1' }}>
                  <span>💨 High-Altitude Wind Gust Hazard</span>
                  <strong style={{ color: '#a78bfa' }}>{Math.min(100, Math.round(liveWindSpeed * 1.2))}%</strong>
                </div>
                <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, Math.round(liveWindSpeed * 1.2))}%`, background: '#a78bfa' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#cbd5e1' }}>
                  <span>⏳ Historic Cutoff Window Duration</span>
                  <strong style={{ color: '#f59e0b' }}>74 Days/Year Average</strong>
                </div>
              </div>
            </div>

            {/* Dynamic Slider Toggles */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                    <span>Rainfall</span>
                    <strong style={{ color: '#38bdf8' }}>{liveRainfall} mm/h</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={liveRainfall}
                    onChange={(e) => setLiveRainfall(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#38bdf8', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                    <span>Wind Gust</span>
                    <strong style={{ color: '#a78bfa' }}>{liveWindSpeed} km/h</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={liveWindSpeed}
                    onChange={(e) => setLiveWindSpeed(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#a78bfa', marginTop: '4px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Implemented Efficient Approach (Objective 04 Output) */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(2, 132, 199, 0.12) 100%)',
            border: '2px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '14px',
            padding: '1.25rem',
            boxShadow: '0 8px 30px rgba(16, 185, 129, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ✨ Recommended Efficient Approach
              </span>
              <span style={{
                background: '#10b981',
                color: '#0f172a',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                OPTIMAL STRATEGY
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '2rem' }}>{optimalApproach.icon}</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  {optimalApproach.mode}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
                  Transit Time: <strong>{optimalApproach.time}</strong> (Saves {optimalApproach.timeSaved})
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.45, margin: '0 0 1rem 0' }}>
              {optimalApproach.rationale}
            </p>

            {/* KPI Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '6px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block' }}>Risk Reduction</span>
                <strong style={{ fontSize: '0.9rem', color: '#34d399' }}>+{optimalApproach.riskMitigation}</strong>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '6px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block' }}>Cost Estimate</span>
                <strong style={{ fontSize: '0.9rem', color: '#38bdf8' }}>{optimalApproach.cost}</strong>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '6px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block' }}>Carbon Rate</span>
                <strong style={{ fontSize: '0.9rem', color: '#f59e0b' }}>{optimalApproach.carbonG}</strong>
              </div>
            </div>

            {/* Execute Transit Simulator Button */}
            <button
              onClick={handleSimulateExecution}
              disabled={isSimulatingDispatch}
              className="glow-btn-cyan"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: isSimulatingDispatch ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isSimulatingDispatch ? `🚀 Dispatch En Route (${dispatchProgress}%)...` : '⚡ Implement & Simulate Efficient Approach'}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Dispatch Telemetry Feed (when simulation is active) */}
      {dispatchLogs.length > 0 && (
        <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
              📡 Live Mission Telemetry & Waypoint Execution Stream
            </span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Status: {isSimulatingDispatch ? 'IN TRANSIT' : 'COMPLETED'}
            </span>
          </div>
          <div style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.78rem',
            color: '#a7f3d0',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            {dispatchLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MLRiskEnginePage;
