import express from 'express';

const router = express.Router();

// Contrasting region case-study corridors (Objective 06)
const caseStudyCorridors = [
  {
    id: 'corridor-himalaya',
    name: 'Western Himalayan Highland Corridor',
    regionType: 'High-Altitude Mountain & Border Pass',
    elevationRange: '1,800m - 4,200m',
    primaryHazards: ['Landslides', 'Snow Avalanches', 'Bridge Washouts'],
    feasibilityScore: 48,
    activeModeRecommendation: 'Hybrid Rail + Drone Airlift',
    summary: 'Connecting high-altitude border villages with strategic supply depots. High seasonal cutoff risk during heavy precipitation.',
    villages: [
      { id: 'v-h1', name: 'Zanskar Outpost', population: 640, terrain: 'High Alpine / Glacial', accessScore: 28, riskStatus: 'High', coordinates: { lat: 33.512, lng: 76.883 }, borderZone: true, seasonalCutoffDays: 140 },
      { id: 'v-h2', name: 'Kargi Valley Settlement', population: 1420, terrain: 'Steep Gorge / Switchbacks', accessScore: 46, riskStatus: 'High', coordinates: { lat: 34.120, lng: 76.995 }, borderZone: true, seasonalCutoffDays: 90 },
      { id: 'v-h3', name: 'Spiti Base Feeder', population: 2100, terrain: 'Mountain Valley', accessScore: 68, riskStatus: 'Moderate', coordinates: { lat: 32.246, lng: 78.034 }, borderZone: false, seasonalCutoffDays: 45 }
    ],
    multimodalOptions: [
      { mode: 'All-Terrain Road', duration: '9h 30m', costPerKg: '₹28', riskIndex: 82, carbonGPerKm: 180, status: 'Restricted (Landslide alert)' },
      { mode: 'Cargo Drone Flight', duration: '1h 15m', costPerKg: '₹65', riskIndex: 18, carbonGPerKm: 25, status: 'Optimal for Medical & Emergency' },
      { mode: 'Mountain Rail Feeder', duration: '5h 40m', costPerKg: '₹14', riskIndex: 35, carbonGPerKm: 42, status: 'Available to Foothill Railhead' }
    ]
  },
  {
    id: 'corridor-delta',
    name: 'Brahmaputra Riverine & Delta Corridor',
    regionType: 'Tropical Floodplain & Island Char Settlements',
    elevationRange: '30m - 120m',
    primaryHazards: ['Monsoon Flooding', 'Riverbank Erosion', 'Submerged Roads'],
    feasibilityScore: 74,
    activeModeRecommendation: 'Inland Waterway Freight Barge',
    summary: 'Riverine and delta settlements where seasonal monsoon floods completely submerge asphalt road links, making waterways the lifeline.',
    villages: [
      { id: 'v-d1', name: 'Majuli Island Char #4', population: 2800, terrain: 'River Island / Marshland', accessScore: 35, riskStatus: 'High', coordinates: { lat: 26.950, lng: 94.210 }, borderZone: false, seasonalCutoffDays: 75 },
      { id: 'v-d2', name: 'Dhemaji River Bank', population: 3900, terrain: 'Alluvial Floodplain', accessScore: 58, riskStatus: 'Moderate', coordinates: { lat: 27.480, lng: 94.580 }, borderZone: false, seasonalCutoffDays: 40 },
      { id: 'v-d3', name: 'Sadiya Junction Depot', population: 5100, terrain: 'Elevated Riverine Basin', accessScore: 82, riskStatus: 'Low', coordinates: { lat: 27.830, lng: 95.660 }, borderZone: true, seasonalCutoffDays: 15 }
    ],
    multimodalOptions: [
      { mode: 'Inland River Barge', duration: '3h 15m', costPerKg: '₹9', riskIndex: 22, carbonGPerKm: 28, status: 'Highly Recommended' },
      { mode: 'All-Terrain Road', duration: '7h 10m', costPerKg: '₹32', riskIndex: 88, carbonGPerKm: 195, status: 'High Flood Disruption Risk' },
      { mode: 'Cargo Drone Flight', duration: '45m', costPerKg: '₹55', riskIndex: 12, carbonGPerKm: 22, status: 'Active for Rapid Vaccines/Diagnostic Labs' }
    ]
  },
  {
    id: 'corridor-desert',
    name: 'Western Thar Arid Border Corridor',
    regionType: 'Desert Sand Dunes & Remote Border Outposts',
    elevationRange: '150m - 320m',
    primaryHazards: ['Sandstorm Blindouts', 'Extreme Heat (48°C)', 'Soft Sand Trap'],
    feasibilityScore: 68,
    activeModeRecommendation: 'Heavy 6x6 Off-Road Convoy + Drone Recon',
    summary: 'Deep desert frontier settlements with unpaved sand tracks, severe water scarcity, and isolated border guard hamlets.',
    villages: [
      { id: 'v-b1', name: 'Tanot Border Settlement', population: 890, terrain: 'Shifting Sand Dunes', accessScore: 42, riskStatus: 'Moderate', coordinates: { lat: 27.800, lng: 70.350 }, borderZone: true, seasonalCutoffDays: 20 },
      { id: 'v-b2', name: 'Longewala Frontier Hamlets', population: 520, terrain: 'Desert Arid Plain', accessScore: 38, riskStatus: 'Moderate', coordinates: { lat: 27.520, lng: 70.150 }, borderZone: true, seasonalCutoffDays: 30 },
      { id: 'v-b3', name: 'Ramgarh Feeder Hub', population: 4300, terrain: 'Semi-Arid Scrubland', accessScore: 76, riskStatus: 'Low', coordinates: { lat: 27.360, lng: 70.500 }, borderZone: false, seasonalCutoffDays: 5 }
    ],
    multimodalOptions: [
      { mode: '6x6 Off-Road Convoy', duration: '4h 30m', costPerKg: '₹22', riskIndex: 45, carbonGPerKm: 210, status: 'Operational with GPS convoy' },
      { mode: 'Solar-Powered Drone', duration: '1h 05m', costPerKg: '₹48', riskIndex: 30, carbonGPerKm: 8, status: 'Optimal during Morning (low wind)' },
      { mode: 'Feeder Rail Line', duration: '3h 00m', costPerKg: '₹12', riskIndex: 15, carbonGPerKm: 38, status: 'Terminates at Ramgarh Hub' }
    ]
  }
];

// GET /api/corridors
router.get('/', (req, res) => {
  res.json({ success: true, count: caseStudyCorridors.length, data: caseStudyCorridors });
});

// GET /api/corridors/:id
router.get('/:id', (req, res) => {
  const corridor = caseStudyCorridors.find(c => c.id === req.params.id);
  if (!corridor) return res.status(404).json({ success: false, message: 'Corridor not found' });
  res.json({ success: true, data: corridor });
});

export default router;
