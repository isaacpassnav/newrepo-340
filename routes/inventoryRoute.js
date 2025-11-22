const express = require("express");
const router = express.Router();
const invController = require("../controllers/inventoryController");
const utilities = require("../utilities/");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));
router.get("/", utilities.handleErrors(invController.buildManagement));
router.get("/add-classification",utilities.handleErrors (invController.buildAddClassification));
router.post("/add-classification", invValidate.classificationRules(), invValidate.checkClassificationData, utilities.handleErrors(invController.addClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory", invValidate.inventoryRules(), invValidate.checkInventoryData,utilities.handleErrors(invController.addInventory));

module.exports = router;