const pool = require("../database/db")

async function addFavorite(account_id, inv_id) {
    try {
        const sql = `INSERT INTO favorites (account_id, inv_id) 
                 VALUES ($1, $2) 
                 RETURNING *`;
        return await pool.query(sql,[account_id, inv_id])
    } catch (error) {
        return error.message;
    }
};

async function getFavoritesByAccount(account_id) {
    try {
        const sql = `SELECT f.favorite_id, f.created_at, i.*
                FROM favorites f
                JOIN inventory i ON f.inv_id = i.inv_id
                WHERE f.account_id = $1
                ORDER BY f.created_at DESC`;
        const result = await pool.query(sql,[account_id])
        return result.rows;
    } catch (error) {
        return error.message;
    }
}

async function removeFavorite(favorite_id, account_id) {
  try {
    const sql = `DELETE FROM favorites 
                 WHERE favorite_id = $1 AND account_id = $2 
                 RETURNING *`;
    return await pool.query(sql, [favorite_id, account_id]);
  } catch (error) {
    return error.message;
  }
}

async function checkIfFavorite(account_id, inv_id) {
  try {
    const sql = `SELECT * FROM favorites 
                 WHERE account_id = $1 AND inv_id = $2`;
    const result = await pool.query(sql, [account_id, inv_id]);
    return result.rowCount > 0;
  } catch (error) {
    return false;
  }
}

module.exports = {addFavorite, getFavoritesByAccount, removeFavorite, checkIfFavorite};