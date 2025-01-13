import { Router } from 'express';

const router = Router();

// Mock data
const networkHealth = {
  status: 'healthy',
  uptime: '99.9%',
  bandwidth: '1.2 Gbps',
  activeConnections: 245
};

const latencyStats = {
  average: 25,
  min: 10,
  max: 150,
  jitter: 5
};

// Routes
router.get('/health', (req, res) => {
  res.json(networkHealth);
});

router.get('/latency', (req, res) => {
  res.json(latencyStats);
});

export const networkRoutes = router; 