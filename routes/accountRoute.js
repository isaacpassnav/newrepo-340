const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");
const { route } = require("./static");


router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister));
router.post("/register", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount));
router.post("/login", regValidate.loginRules(), regValidate.checkLoginData,utilities.handleErrors(accountController.accountLogin));
router.get("/", utilities.handleErrors(accountController.buildAccountManagement));
router.get("/logout", utilities.handleErrors(accountController.logoutAccount));
router.get("/update", utilities.checkLogin, utilities.handleErrors(accountController.buildUpdateAccount));
router.post("/update", utilities.checkLogin, utilities.handleErrors(accountController.updateAccount));
router.post("/change-password", utilities.checkLogin, utilities.handleErrors(accountController.changePassword));

module.exports = router;