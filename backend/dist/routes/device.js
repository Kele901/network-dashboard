"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.deviceRoutes = router;
