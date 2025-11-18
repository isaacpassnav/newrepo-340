const express = require("express");
const router = express.Router();
const utilities = require("../utilities/");

router.get("/", utilities.handleErrors(async (req, res) => {
  let nav = await utilities.getNav();
  res.render("index", {
    title: "CSE Motors | Home",
    nav
  });
}));

module.exports = router;