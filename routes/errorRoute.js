const express = require("express");
const router = express.Router();

// Ruta que genera un error intencional
router.get("/trigger-error", (req, res, next) => {
  // Genera un error intencional
  const error = new Error("This is an intentional 500 error for testing!");
  error.status = 500;
  throw error;
});

module.exports = router;