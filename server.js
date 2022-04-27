const app = require('./app.js');
const express = require("express")
const PORT = 8000;

// app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

app.listen(PORT, () => console.log(`server should be running at http://localhost:${PORT}/`))


