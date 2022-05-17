/* libraries */
const express = require("express");
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto')
const router = express.Router();
const mysqlDB = require('../database/databaseAccessLayer')





//all products
// router.get("/products",  async (req, res) => {
//   res.render("add_cart/products", {productInfo:productInfo, cartItemsTotal:cartItemsTotal })
//
// })



const http = require('http');
const socketio = require('socket.io');
// const formatMessage = require('./utils/messages');
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers
// } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
// app.use(express.static(path.join(__dirname, 'public')));
// const botName = 'ChatCord Bot';
router.get("/",  async (req, res) => {
  // res.render("chat/test");
  res.sendFile( __dirname + '/../views/chat/test.html');


})


// Run when client connects
io.on('connection', socket => {
  console.log("IO is connected now ")
//   socket.on('joinRoom', ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);
//
//     socket.join(user.room);
//
//     // Welcome current user
//     socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
//
//     // Broadcast when a user connects
//     socket.broadcast
//         .to(user.room)
//         .emit(
//             'message',
//             formatMessage(botName, `${user.username} has joined the chat`)
//         );
//
//     // Send users and room info
//     io.to(user.room).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room)
//     });
//   });
//
//   // Listen for chatMessage
//   socket.on('chatMessage', msg => {
//     const user = getCurrentUser(socket.id);
//
//     io.to(user.room).emit('message', formatMessage(user.username, msg));
//   });
//
//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     const user = userLeave(socket.id);
//
//     if (user) {
//       io.to(user.room).emit(
//           'message',
//           formatMessage(botName, `${user.username} has left the chat`)
//       );
//
//       // Send users and room info
//       io.to(user.room).emit('roomUsers', {
//         room: user.room,
//         users: getRoomUsers(user.room)
//       });
//     }
//   });
});

module.exports = router;