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
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect
  });
};

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body;
  const addResult = await invModel.addClassification(classification_name);
  
  if (addResult) {
    req.flash("notice", `Congratulations, the ${classification_name} classification was successfully added.`);
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Sorry, the insert failed.");
    res.status(501).redirect("/inv/add-classification");
  }
};

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationSelect = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationSelect,
    errors: null,
  });
};
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav();
  const { 
    classification_id, 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color 
  } = req.body;

  const addResult = await invModel.addInventory(
    classification_id, 
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color
  );

  if (addResult) {
    req.flash("notice", `Congratulations, the ${inv_make} ${inv_model} was successfully added.`);
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Sorry, the insert failed.");
    let classificationSelect = await utilities.buildClassificationList(classification_id);
    res.status(501).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      errors: null,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
  }
};

module.exports = invCont;