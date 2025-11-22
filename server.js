const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const pool = require("./database/db");
const staticRoutes = require("./routes/static");
const routes = require("./routes/index");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/errorHandler");

const app = express();
app.use(flash());

app.use(session({
  secret: process.env.SESSION_SECRET || "123456@",
  resave: true,
  saveUninitialized: true,
  name: "sessionId",
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
}));


// app.use(function(req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ***************
 * View Engine Setup
 *****************/
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");


app.use(staticRoutes);
app.use(routes);


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

app.listen(port, host, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
});