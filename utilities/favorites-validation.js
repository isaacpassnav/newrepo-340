const {body, validationResult} = require('express-validator');
const utilities = require('.');

const validate = {};

validate.favoriteRules = () => {
    return [
        body('inv_id')
            .trim()
            .isNumeric()
            .withMessage('Invalid vehicle ID.')
            .isInt({ min: 1 })
            .withMessage('Vehicle ID must be a positive number.'),
    ];
};
validate.checkFavoriteData = async (req, res, next) => {
    const {inv_id} = req.body;
    let errors = [];
  errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    req.flash("notice", "Invalid vehicle. Please try again.");
    res.redirect(`/inv/detail/${inv_id}`);
    return;
  }
  next();
};
module.exports = validate;
