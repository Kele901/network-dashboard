import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { networkRoutes } from './routes/network';
import { organizationRoutes } from './routes/organization';
import { deviceRoutes } from './routes/device';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/networks', networkRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/devices', deviceRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
}); 