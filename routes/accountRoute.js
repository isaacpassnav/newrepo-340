const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");


router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.get("/register", utilities.handleErrors(accountController.buildRegister));

router.post("/register", regValidate.registrationRules(), regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

router.post("/login", regValidate.loginRules(), regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);
router.get("/", utilities.handleErrors(accountController.buildAccountManagement));

module.exports = router;