const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId;
    console.log("🔍 Classification ID:", classification_id);
    
    const data = await invModel.getInventoryByClassificationId(classification_id);
    console.log("📊 Data received:", data ? data.length : 0, "vehicles");
    
    const grid = await utilities.buildClassificationGrid(data);
    console.log("✅ Grid built successfully");
    
    let nav = await utilities.getNav();
    console.log("✅ Nav built successfully");
    
    const className = data[0].classification_name;
    console.log("📝 Rendering view for:", className);
    
    res.render("inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    console.error("❌ Error in buildByClassificationId:", error);
    next(error);
  }
};

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inv_id = req.params.invId;
    console.log("🔍 Inventory ID:", inv_id);
    
    const data = await invModel.getInventoryByInvId(inv_id);
    console.log("📊 Vehicle data:", data ? data.inv_make + " " + data.inv_model : "NOT FOUND");
    
    if (!data) {
      throw new Error("Vehicle not found");
    }
    
    const detailView = utilities.buildDetailView(data);
    console.log("✅ Detail view built successfully");
    
    let nav = await utilities.getNav();
    console.log("✅ Nav built successfully");
    
    const vehicleName = `${data.inv_make} ${data.inv_model}`;
    console.log("📝 Rendering detail view for:", vehicleName);
    
    res.render("inventory/detail", {
      title: vehicleName,
      nav,
      detailView,
    });
  } catch (error) {
    console.error("❌ Error in buildByInventoryId:", error);
    next(error);
  }
};

module.exports = invCont;