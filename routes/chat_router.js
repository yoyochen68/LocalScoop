/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')

//formating the message shown
// const formatMessage = require('../views/chat/utils/messages')

const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')





router.get("/store",  async (req, res) => {

    let storeId = req.session.seller.seller_id

        // Geting the chatrooms related to the store id
    let storeChatList = await mysqlDB.getStoreChats(storeId)
    console.log(storeChatList)

    res.render("chat/store_index",{storeChatList:storeChatList});

})





router.get("/buyer",  async (req, res) => {

    let buyerId = req.session.buyer.buyer_id

    // Geting the chatrooms related to the store id
    let buyerChatList = await mysqlDB.getBuyerChats(buyerId)
    console.log(buyerChatList)



        res.render("chat/buyer_index", {buyerChatList:buyerChatList});
})



router.get("/room/:id",  async (req, res) => {
    req.session.authenticated = true

    let roomId = req.params.id

    let roomUsers = await mysqlDB.chatUsersName(roomId)
    console.log("routerObejct", roomUsers)

    if(req.session.seller) {
        req.session.seller.name = roomUsers.storeName
        console.log(req.session.seller.name)

    }else {
        req.session.buyer.name = roomUsers.buyerName
        console.log(req.session.buyer.name)
    }
    // let storeName = roomUsers.buyerName
    // let buyerName = roomUsers.storeName

    // req.session.buyer.buyer_id = 3
    // req.session.buyer.chathistory = ['allo', 'get umbrella!']
  
    console.log('render room')
    res.render("chat/room",{roomId:roomId});
    // res.render("chat/room",{roomId:roomId, storeName:storeName, buyerName:buyerName});

})




// router.get("/room",  async (req, res) => {
//     console.log('render room')
//     res.render("chat/room");
//
// })

module.exports = router;