import React, { useState } from 'react';

const VillageTable = ({ villages = [], onSelectVillage, selectedVillage }) => {
  const [search, setSearch] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [borderOnly, setBorderOnly] = useState(false);

  const filtered = villages.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                          v.terrain.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'ALL' || v.riskStatus.toUpperCase() === selectedRiskFilter;
    const matchesBorder = !borderOnly || v.borderZone;
    return matchesSearch && matchesRisk && matchesBorder;
  });

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      {/* Table Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏘️</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Objective 03: Village-Level Accessibility Scoring (Remote & Border Settlements)
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Scoring isolation risk, seasonal cutoff probability, and emergency medical buffer for strategic border posts
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Border Zone Toggle */}
          <button
            onClick={() => setBorderOnly(!borderOnly)}
            style={{
              background: borderOnly ? 'rgba(239, 68, 68, 0.2)' : 'rgba(15, 23, 42, 0.8)',
              border: `1px solid ${borderOnly ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
              color: borderOnly ? '#fecaca' : '#94a3b8',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🛡️ Border Settlements {borderOnly ? 'ONLY' : 'All'}
          </button>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search village or terrain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
              width: '180px'
            }}
          />

          {/* Quick Risk Filter */}
          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MODERATE">Moderate Risk</option>
            <option value="HIGH">High Risk</option>
          </select>
        </div>
      </div>

      {/* Modern Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 14px' }}>Settlement Name</th>
              <th style={{ padding: '12px 14px' }}>Population</th>
              <th style={{ padding: '12px 14px' }}>Terrain & Frontier Status</th>
              <th style={{ padding: '12px 14px' }}>Accessibility Score</th>
              <th style={{ padding: '12px 14px' }}>Seasonal Cutoff</th>
              <th style={{ padding: '12px 14px' }}>Risk Rating</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => {
              const isSelected = selectedVillage?.id === v.id;
              const isHigh = v.riskStatus === 'High';
              const isMod = v.riskStatus === 'Moderate';

              return (
                <tr
                  key={v.id}
                  onClick={() => onSelectVillage && onSelectVillage(v)}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: isSelected ? '#38bdf8' : '#64748b' }}>📍</span>
                      {v.name}
                      {v.borderZone && (
                        <span style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#f87171',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}>
                          BORDER POST
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>
                    {v.population.toLocaleString()} residents
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      {v.terrain}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${v.accessScore}%`,
                          height: '100%',
                          background: v.accessScore > 70 ? '#10b981' : v.accessScore > 45 ? '#f59e0b' : '#f43f5e'
                        }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{v.accessScore}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#cbd5e1', fontSize: '0.8rem' }}>
                    {v.seasonalCutoffDays ? `${v.seasonalCutoffDays} days/yr` : '15-30 days/yr'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: isHigh ? 'rgba(244, 63, 94, 0.15)' : isMod ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: isHigh ? '#fda4af' : isMod ? '#fde68a' : '#a7f3d0',
                      border: `1px solid ${isHigh ? 'rgba(244, 63, 94, 0.3)' : isMod ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                    }}>
                      {v.riskStatus}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVillage && onSelectVillage(v);
                      }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        background: isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.1)',
                        color: isSelected ? '#0f172a' : '#38bdf8',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? 'Focused' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VillageTable;
