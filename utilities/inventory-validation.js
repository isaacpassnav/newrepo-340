const utilities = require(".")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")

const validate = {}

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Classification name cannot contain spaces or special characters."),
  ]
}

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters."),
    
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters."),
    
    body("inv_year")
      .trim()
      .isLength({ min: 4, max: 4 })
      .withMessage("Year must be 4 digits.")
      .isNumeric()
      .withMessage("Year must be a number."),
    
    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description is required."),
    
    body("inv_image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Image path is required."),
    
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Thumbnail path is required."),
    
    body("inv_price")
      .trim()
      .isNumeric()
      .withMessage("Price must be a number.")
      .isFloat({ min: 0 })
      .withMessage("Price must be positive."),
    
    body("inv_miles")
      .trim()
      .isNumeric()
      .withMessage("Miles must be a number.")
      .isInt({ min: 0 })
      .withMessage("Miles must be a positive integer."),
    
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Color is required."),
    
    body("classification_id")
      .trim()
      .isNumeric()
      .withMessage("Classification is required."),
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const { 
    classification_id, inv_make, inv_model, inv_year, inv_description, 
    inv_image, inv_thumbnail, inv_price, inv_miles, inv_color 
  } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationSelect = await utilities.buildClassificationList(classification_id)
    res.render("inventory/add-inventory", {
      errors,
      title: "Add New Vehicle",
      nav,
      classificationSelect,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    })
    return
  }
  next()
}
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add New Classification",
      nav,
      classification_name,
      message: req.flash()
    })
    return
  }
  next()
}

module.exports = validate