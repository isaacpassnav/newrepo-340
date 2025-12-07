const favoritesModel = require("../models/favorites-model");
const utilities = require("../utilities/");

const favCont = {};

favCont.addToFavorites = async function (req, res) {
  const { inv_id } = req.body;
  const account_id = res.locals.accountData.account_id;

  const result = await favoritesModel.addFavorite(account_id, inv_id);

  if (result && result.rowCount > 0) {
    req.flash("notice", "Vehicle added to favorites!");
    res.redirect(`/inv/detail/${inv_id}`);
  } else {
    req.flash("notice", "This vehicle is already in your favorites or an error occurred.");
    res.redirect(`/inv/detail/${inv_id}`);
  }
};

favCont.viewFavorites = async function (req, res, next) {
  let nav = await utilities.getNav();
  const account_id = res.locals.accountData.account_id;
  
  const favorites = await favoritesModel.getFavoritesByAccount(account_id);
  
  let favoritesGrid;
  if (favorites && favorites.length > 0) {
    favoritesGrid = await utilities.buildFavoritesGrid(favorites);
  } else {
    favoritesGrid = '<p class="notice">You have no favorite vehicles yet. Start browsing!</p>';
  }

  res.render("favorites/list", {
    title: "My Favorites",
    nav,
    favoritesGrid,
    errors: null,
  });
};

favCont.removeFromFavorites = async function (req, res) {
  const { favorite_id } = req.params;
  const account_id = res.locals.accountData.account_id;

  const result = await favoritesModel.removeFavorite(favorite_id, account_id);

  if (result && result.rowCount > 0) {
    req.flash("notice", "Vehicle removed from favorites.");
  } else {
    req.flash("notice", "Failed to remove vehicle from favorites.");
  }
  
  res.redirect("/favorites/");
};

module.exports = favCont;