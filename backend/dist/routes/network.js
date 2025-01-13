"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.networkRoutes = router;
