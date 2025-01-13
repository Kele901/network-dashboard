import { Router } from 'express';

const router = Router();

// Mock data
const organizations = [
  {
    id: '1',
    name: 'London HQ',
    location: 'London, UK',
    networkStatus: 'active',
    deviceCount: 42
  }
];

// Routes
router.get('/', (req, res) => {
  res.json(organizations);
});

export const organizationRoutes = router; 