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

module.exports = invCont;