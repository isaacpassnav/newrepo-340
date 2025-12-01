const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const utilities = require("../utilities/");
const invValidate = require("../utilities/inventory-validation");

// Punblic routes
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));
// Protected routes
router.get("/", utilities.checkLogin, utilities.handleErrors(invController.buildManagement));
router.get("/add-classification", utilities.checkLogin, utilities.handleErrors (invController.buildAddClassification));
router.post("/add-classification", utilities.checkLogin, invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification));
router.get("/add-inventory", utilities.checkLogin, utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory",utilities.checkLogin, invValidate.inventoryRules(), invValidate.checkInventoryData,utilities.handleErrors(invController.addInventory));

module.exports = router;