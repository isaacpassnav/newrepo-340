const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const pool = require("./database/db");
const staticRoutes = require("./routes/static");
const routes = require("./routes/index");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/errorHandler");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

/* ***************
 * Static Files (must be before routes)
 *****************/
app.use(staticRoutes);

app.use(routes);

/* ***************
 * Error Handling (must be last)
 *****************/
app.use(notFoundHandler);
app.use(globalErrorHandler);

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

testDB();

app.listen(port, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
});