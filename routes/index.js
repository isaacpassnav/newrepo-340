const express = require("express");
const router = express.Router();

// Import individual route modules
const homeRoutes = require("./home");
const inventoryRoutes = require("./inventoryRoute");
const errorRoutes = require("./errorRoute");
const accountRoutes = require("./accountRoute");

// Mount routes with their base paths
router.use("/", homeRoutes);           // Home routes at root
router.use("/inv", inventoryRoutes);   // Inventory routes at /inv/*
router.use("/", errorRoutes);         // Error routes at root
router.use("/account", accountRoutes); // Account routes at /account/*

module.exports = router;