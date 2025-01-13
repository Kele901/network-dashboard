"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
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
exports.organizationRoutes = router;
