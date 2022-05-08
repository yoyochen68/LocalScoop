/* libraries */
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-session")
const mysql = require("mysql2")
const ejs = require("ejs")

// import cookieSession from "cookie-session"
// import mysql from "mysql2"
// import ejs from 'ejs'

//==image ===
const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

// import multer from 'multer'
// import path from 'path'
// import crypto from 'crypto';

// other files 
const server = require("./server.js")

// router files. require the router js files
const shopSetupRouter = require("./routes/shop_setup_router")
const productPostRouter = require("./routes/product_post_router")
const ordersRouter = require("./routes/orders_router")
const sellerShopRouter = require("./routes/seller_shop_router")
const sellerLandingRouter = require("./routes/seller_landing_router")
const addCartRouter = require("./routes/add_cart_router")

// const sellerHomeRouter = require("./routes/seller_home_router")


const PORT = process.env.PORT || 8000; // let express set port, else make it 8000

/*** express ***/
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static("public")); // allow front end to use the /public folder
app.use(express.json()); 
app.set('view engine', 'ejs'); // set templating engine to ejs


// cookie sessions
app.use(cookieSession({
  name:'kevin',
  keys:['localscoop:8000'],
  maxAge: 1000 * 60 * 60
}))


/**   router routes, set beginning of path   **/
app.use("/shop_setup", shopSetupRouter);
app.use("/product_post", productPostRouter);
app.use("/orders", ordersRouter);
app.use("/seller_shop", sellerShopRouter);
app.use("/seller_landing", sellerLandingRouter)
app.use("/add_cart", addCartRouter)



/* ROUTES */

// route for testing, 
app.get("/", (req, res) => {
  res.render("index")
})



app.get("/sitemap", (req, res) => {
  res.render("sitemap")
})


//====image upload===
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    const bytes = crypto.randomBytes(16).toString('hex')
    cb(null, bytes + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');
// can do .array() if you want to upload multiple images

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}





module.exports = app;

