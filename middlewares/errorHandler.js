const utilities = require("../utilities/");

async function notFoundHandler(req, res, next) {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
}
async function globalErrorHandler(err, req, res, next) {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  
  let message;
  if (err.status == 404) {
    message = err.message;
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?';
  }
  
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};