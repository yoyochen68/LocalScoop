/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')

//formating the message shown
const formatMessage = require('../views/chat/utils/messages')

const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')





router.get("/",  async (req, res) => {
    console.log('render chat')
  res.render("chat/index");

})



router.get("/room",  async (req, res) => {
    console.log('render room')
    res.render("chat/room");

})

module.exports = router;