const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const pool = require("./database/db");
const staticRoutes = require("./routes/static");
const routes = require("./routes/index");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/errorHandler");

const app = express();

/* ***************
 * Middleware
 *****************/
// Session store - usar PostgreSQL en producción
let sessionStore;
if (process.env.NODE_ENV === "production") {
  const pgSession = require('connect-pg-simple')(session);
  sessionStore = new pgSession({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true
  });
} else {
  sessionStore = new session.MemoryStore();
}

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "supersecretkey123",
  resave: true,
  saveUninitialized: true,
  name: "sessionId",
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ***************
 * View Engine Setup
 *****************/
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

/* ***************
 * Static Files
 *****************/
app.use(staticRoutes);

/* ***************
 * Application Routes
 *****************/
app.use(routes);

app.use(notFoundHandler);
app.use(globalErrorHandler);


async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connection successful");
  } catch (err) {
    console.error("🔴 Database connection failed:", err.message);
  }
}

/* ***************
 * Server Start
 *****************/
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

testDB();

app.listen(port, host, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
});