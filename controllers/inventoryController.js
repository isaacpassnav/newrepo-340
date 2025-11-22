const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);
    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;
    
    res.render("inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    next(error);
  }
};

invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inv_id = req.params.invId;
    const data = await invModel.getInventoryByInvId(inv_id);
    
    if (!data) {
      const error = new Error("Vehicle not found");
      error.status = 404;
      throw error;
    }
    
    const detailView = utilities.buildDetailView(data);
    let nav = await utilities.getNav();
    const vehicleName = `${data.inv_make} ${data.inv_model}`;
    
    res.render("inventory/detail", {
      title: vehicleName,
      nav,
      detailView,
    });
  } catch (error) {
    next(error);
  }
};

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  console.log("Messages:", req.flash());
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect,
    messages: req.flash()
  });
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    messages: req.flash()
  });
};

invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body;
  const addResult = await invModel.addClassification(classification_name);

  if (addResult) {
    console.log("✅ Setting flash message...");
    req.flash("success", `The ${classification_name} classification was successfully added.`);
    console.log("Flash after set:", req.flash());
    res.redirect("/inv/");
  } else {
    req.flash("error", "Sorry, adding the classification failed.");
    let nav = await utilities.getNav();
    res.status(501).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: null,
    });
  }
};

module.exports = invCont;