/* libraries */
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

//==image ===
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
//===image

// fake-database
const db = require("./fake-db")

// router files. require the router js files
const shopSetupRouter = require("./routes/shop_setup_router")



// use express
const app = express();
app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs'); // set templating engine to ejs
app.use(express.static("public")); // allow front end to use the /public folder
app.use(express.json());


// router routes, set beginning of path
app.use("/shop_setup", shopSetupRouter);


/* ROUTES */

// route for testing, 
app.get("/", (req, res) => {
  res.render("index")
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



app.get('/', (req, res) => res.render('index'));

app.post('/upload', upload, (req, res) => {
  if (req.file == undefined) {
    res.render('/shop_setup/shop_setup_6', {
      msg: 'Error: No File Selected!'
    });
    return 
  } 
  console.log(req.file)
  // store some info in the database
  res.render('shop_setup/shop_setup_6', {
    msg: 'File Uploaded!',
    file: `uploads/${req.file.filename}`
  });
});

// pointless comment to change the network graoph

module.exports = app;

