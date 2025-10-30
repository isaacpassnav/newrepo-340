const express = require("express");
const env = require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const staticRoutes = require("./routes/static");
const homeRoutes = require("./routes/home");
const pool = require("./database/db");

const app = express();

/* ***************
 * View Engine Setup
 *****************/
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//  layouts globalmente
app.use(expressLayouts);
app.set("layout", "./layouts/main");

/* ***************
 * Routes
 *****************/
app.use(staticRoutes);
app.use("/", homeRoutes);

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("🟢 Database connection successful");
  } catch (err) {
    console.log("🔴 Database connection failed", err);
  }
}
testDB();

app.listen(port, () => {
  console.log(`✅ app listening on ${host}:${port}`);
});
