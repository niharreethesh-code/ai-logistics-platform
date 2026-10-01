import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import riskRoutes from './routes/risk.js';
import routingRoutes from './routes/routing.js';
import villageRoutes from './routes/villages.js';
import corridorRoutes from './routes/corridors.js';
import multimodalRoutes from './routes/multimodal.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Routes for Objectives 01-06
app.use('/api/risk', riskRoutes);
app.use('/api/routing', routingRoutes);
app.use('/api/villages', villageRoutes);
app.use('/api/corridors', corridorRoutes);
app.use('/api/multimodal', multimodalRoutes);

// Root info endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'AI-Driven Multi-Modal Rural Logistics & Disaster Management Platform API',
    status: 'ONLINE',
    version: '2.0.0',
    endpoints: {
      health: 'http://localhost:5050/health',
      corridors: 'http://localhost:5050/api/corridors',
      multimodal_modes: 'http://localhost:5050/api/multimodal/modes',
      villages: 'http://localhost:5050/api/villages',
      risk_assessment: 'http://localhost:5050/api/risk/assessment',
      active_routing: 'http://localhost:5050/api/routing/active'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    version: '2.0.0',
    objectivesSupported: ['01-UnifiedDataModel', '02-MLRiskPrediction', '03-VillageScoring', '04-ModeRecommendation', '05-AgencyDisasterAlerts', '06-CaseStudyCorridors'],
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
