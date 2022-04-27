/* libraries */
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");


// fake-database
const db = require("./fake-db")


// router files. require the router js files
const shopSetupRouter = require("./routes/shop_setup_router")


// use express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // set templating engine to ejs
app.use(express.static("public")); // allow front end to use the /public folder


// router routes, set beginning of path
app.use("/shop_setup", shopSetupRouter);


/* ROUTES */

// route for testing, 
app.get("/", (req, res) => {
  res.render("index")
})







module.exports = app;