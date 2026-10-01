import express from 'express';

const router = express.Router();

// Multimodal Modes Definition
const multimodalModes = [
  {
    id: 'road',
    name: 'All-Terrain Road Transport',
    category: 'Surface Ground',
    icon: '🚚',
    vehicleTypes: ['4WD High-Ground Truck', '6x6 Off-Road Convoy', 'All-Weather Utility Van'],
    avgSpeedKmh: 45,
    payloadCapacityKg: 12000,
    costPerKmKg: 0.28,
    carbonGPerTonneKm: 165,
    vulnerabilities: ['Landslides', 'Flash floods', 'Road washout', 'Snow accumulation'],
    resilienceScore: 54
  },
  {
    id: 'rail',
    name: 'Regional Mountain & Feeder Rail',
    category: 'Surface Rail',
    icon: '🚂',
    vehicleTypes: ['Narrow-Gauge Diesel-Electric', 'Standard Heavy Freight Rail'],
    avgSpeedKmh: 65,
    payloadCapacityKg: 850000,
    costPerKmKg: 0.08,
    carbonGPerTonneKm: 32,
    vulnerabilities: ['Track erosion', 'Tunnel blockades', 'Fixed railhead limitation'],
    resilienceScore: 78
  },
  {
    id: 'waterway',
    name: 'Inland River Freight Barge',
    category: 'Waterway',
    icon: '⛴️',
    vehicleTypes: ['Flat-Bottom Shallow Draft Barge', 'Amphibious Cargo Ferry'],
    avgSpeedKmh: 24,
    payloadCapacityKg: 65000,
    costPerKmKg: 0.06,
    carbonGPerTonneKm: 24,
    vulnerabilities: ['Seasonal shallows', 'Monsoon rapids', 'Siltation'],
    resilienceScore: 82
  },
  {
    id: 'drone',
    name: 'Heavy-Lift Autonomous Cargo UAV',
    category: 'Air Dispatch',
    icon: '🛸',
    vehicleTypes: ['Octocopter VTOL Drone (50kg)', 'Tandem-Rotor Cargo UAV (150kg)'],
    avgSpeedKmh: 95,
    payloadCapacityKg: 150,
    costPerKmKg: 0.75,
    carbonGPerTonneKm: 18,
    vulnerabilities: ['High wind gusts (>45 km/h)', 'Dense icing fog', 'Battery endurance'],
    resilienceScore: 92
  }
];

// GET /api/multimodal/modes
router.get('/modes', (req, res) => {
  res.json({ success: true, data: multimodalModes });
});

// POST /api/multimodal/recommend - Risk-aware mode recommendation engine (Objective 04)
router.post('/recommend', (req, res) => {
  const { weatherCondition, terrainType, urgencyLevel, payloadWeightKg } = req.body;

  let recommendedMode = 'road';
  let rationale = '';
  let riskScore = 35;

  if (weatherCondition === 'Severe Rain' || weatherCondition === 'Landslide Alert') {
    if (payloadWeightKg <= 150) {
      recommendedMode = 'drone';
      rationale = 'Road routes closed due to severe landslide hazard. Drone airlift recommended for rapid zero-ground-risk delivery.';
      riskScore = 15;
    } else if (terrainType === 'Riverine' || terrainType === 'Delta') {
      recommendedMode = 'waterway';
      rationale = 'Roads submerged by monsoon surge. River barge provides safe high-capacity transit.';
      riskScore = 24;
    } else {
      recommendedMode = 'rail';
      rationale = 'Mountain highway impassable. Feeder rail operates on fortified structural tunnels to nearest terminal depot.';
      riskScore = 32;
    }
  } else {
    recommendedMode = 'road';
    rationale = 'Normal road clearance index. Standard 4WD transport provides optimal balance of cost and transit speed.';
    riskScore = 20;
  }

  res.json({
    success: true,
    recommendation: {
      modeId: recommendedMode,
      rationale,
      riskScore,
      estimatedHours: recommendedMode === 'drone' ? 1.2 : recommendedMode === 'rail' ? 4.5 : recommendedMode === 'waterway' ? 5.0 : 6.8,
      confidenceScore: 0.94
    }
  });
});

export default router;
