import { Router } from 'express';

const router = Router();

// Mock data
const devices = [
  {
    id: '1',
    name: "John's Laptop",
    type: 'laptop',
    status: 'online',
    ipAddress: '192.168.1.101',
    lastSeen: 'Active now'
  },
  {
    id: '2',
    name: 'Reception iPad',
    type: 'tablet',
    status: 'online',
    ipAddress: '192.168.1.102',
    lastSeen: 'Active now'
  }
];

// Routes
router.get('/', (req, res) => {
  res.json(devices);
});

export const deviceRoutes = router; 