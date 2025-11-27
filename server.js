const express = require("express");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const pool = require("./database/db");
const staticRoutes = require("./routes/static");
const routes = require("./routes/index");
const { notFoundHandler, globalErrorHandler } = require("./middlewares/errorHandler");
const utilities = require("./utilities/");
const { cookie } = require("express-validator");

const app = express();

// Session store configuration
const isProduction = process.env.RENDER === 'true' || process.env.NODE_ENV === 'production';

let sessionStore;
if (isProduction) {
  const pgSession = require('connect-pg-simple')(session);
  sessionStore = new pgSession({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true,
    pruneSessionInterval: 60 * 15 
  });
  console.log("✅ Using PostgreSQL session store");
} else {
  sessionStore = new session.MemoryStore();
  console.log("✅ Using Memory session store (development)");
}


app.set('trust proxy', 1);
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "supersecretkey123",
  resave: false, 
  saveUninitialized: false, 
  name: "sessionId",
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    path: '/'
  },
  rolling: true 
}));
app.use(cookieParser());
app.use(utilities.checkJWTToken)

app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.notice = req.flash('notice');
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

/* ***************
 * Server Start
 *****************/
const port = process.env.PORT || 3000;
const host = isProduction ? "0.0.0.0" : "localhost";

testDB();

app.listen(port, host, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
});