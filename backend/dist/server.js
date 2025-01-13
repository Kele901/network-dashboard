"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const network_1 = require("./routes/network");
const organization_1 = require("./routes/organization");
const device_1 = require("./routes/device");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3004'],
    credentials: true
}));
app.use(express_1.default.json());
// Routes
app.use('/api/networks', network_1.networkRoutes);
app.use('/api/organizations', organization_1.organizationRoutes);
app.use('/api/devices', device_1.deviceRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
