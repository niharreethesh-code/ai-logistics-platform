import express from 'express';

const router = express.Router();

// Mock village data
const mockVillages = [
  { id: 'v1', name: 'Rampur', population: 3200, terrain: 'Plains', accessScore: 85, riskStatus: 'Low', coordinates: { lat: 26.8467, lng: 80.9462 } },
  { id: 'v2', name: 'Chandrapur', population: 1800, terrain: 'Hilly', accessScore: 52, riskStatus: 'Moderate', coordinates: { lat: 26.9124, lng: 80.9850 } },
  { id: 'v3', name: 'Shitalpur', population: 950, terrain: 'Forest / Marshland', accessScore: 34, riskStatus: 'High', coordinates: { lat: 26.7820, lng: 80.8912 } }
];

// GET /api/villages - List all villages
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: mockVillages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/villages/:id - Get specific village details
router.get('/:id', async (req, res) => {
  try {
    const village = mockVillages.find(v => v.id === req.params.id);
    if (!village) {
      return res.status(404).json({ success: false, message: 'Village not found' });
    }
    res.json({ success: true, data: village });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
