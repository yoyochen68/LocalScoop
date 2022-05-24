
const mysqlDB = require('./database/databaseAccessLayer')

module.exports = function(io) {

    //moving it in searate file later
    const moment = require('moment');

    const users=[]
    const messageArray = {
        store:[],
        buyer:[]
    }
    //-------------------------------------------

    let chatRooms = {}
    let socketBuyers = {}
    let socketSellers = {}



    // async function giveMeTheFluffngNames(roomId){
    //     let blah  = await mysqlDB.chatUsersName(roomId)
    //     console.log("inside", blah)
    //     return blah
    //
    // }


    // Run when client connects
    io.on('connection', socket => {


        const session = socket.request.session
        // console.log("------the sesssion is: ",session)
        let user = null
        let room = null




        if (session.buyer ) {
            buyer = session.buyer
            socketBuyers[socket.id] = buyer
            user = socketBuyers[socket.id]

        } else if (session.seller) {
            seller = session.seller
            socketSellers[socket.id] = seller
            user = socketSellers[socket.id]
        }

        if (!user) {
            io.to(socket.id).emit('GTFO')
        }
        // console.log('user connect', socket.id)
        // console.log('socketBuyers', socketBuyers)
        // console.log('socketSellers', socketSellers)


        // Join Private Room
        socket.on('joinRoom', (roomObject) => {
            // console.log("theroom id is: ", roomId)

            let roomId = roomObject.ROOM_ID

            // console.log("roomId", roomId,"storeName", storeName, "buyerName",buyerName )



            // Check if room exists
            if (!chatRooms[roomId]) {

                // Might need database information!
                chatRooms[roomId] = {
                    timestamp: Date.now(),
                    users: [],
                    chatHistory: 'chistory', // call database for chat history
                    roomId: roomId

                }
                room = chatRooms[roomId]
                socket.join(room.roomId)
                // io.to(room.roomId).emit('message', "messageStuff")

            } else {
                room = chatRooms[roomId]
                socket.join(room.roomId)

            }

            room.users.push(user)




            // const user = userJoin(socket.id, username, room);

            // socket.join(user.room);
            //

//actuive thsilfor testig
            // socket.emit('message', formatMessage("admin", 'Welcome to ChatCord!'));



            //
            // socket.broadcast.to(user.room).emit('message',
            //         formatMessage("admin", `${user.username} has joined the chat`));


            // //send users and room info
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getRoomUsers(user.room)
            // });
        } )






        //listen for chatInputMessage
        socket.on('chatMessage',(msg)=>{
            let userName;
            let session = socket.request.session
            let timestamp = Date.now();
            // const user = getCurrentUser(socket.id)
            // console.log(user.room)

            if (session.buyer) {
                userName = session.buyer.name
                messageArray.buyer.push({timestamp:timestamp, msg:msg})
                
            } else if (session.seller) {
                userName = session.seller.name
                messageArray.store.push({timestamp:timestamp, msg:msg})

            }






            io.to(room.roomId).emit('message', formatMessage(userName, msg))
        })


        socket.on ('disconnect',()=>{

            if (session.buyer) {
                mysqlDB.addBuyerChatContent(room.roomId, messageArray.buyer )
                
            }else if (session.seller) {
                mysqlDB.addStoreChatContent(room.roomId, messageArray.store)
            }
            
            // console.log(messageArray)
            // const user = userLeave(socket.id)


            //call the function from db that writes the messages

                

            //
            //
            // if (socketBuyers[socket.id]) {
            //     delete socketBuyers[socket.id]
            // } else if (socketSellers[socket.id]) {
            //     delete socketSellers[socket.id]
            // }
            //
            // if (room.users.length === 0) {
            //
            //     delete room
            // }


            //
            // if(user){
            //     io.to(user.room).emit('message',formatMessage('admin', `${user.username} is dead`))
            // }


            //send users and room info 
            // io.to(user.room).emit('roomUsers', {
            //     room: user.room,
            //     users: getRoomUsers(user.room)
            // });

        })

    });



///---------------------------------- related functions - move to different file--------------------

    //geting an object from the messge input data
    function formatMessage(username, text) {
        return {username, text, time: moment().format('h:mm a')
        };
    }

    //join user to chat
    function userJoin(id, username, room) {
        const user = { id, username, room };
        users.push(user);
        return user;
    }


// Get current user
    function getCurrentUser(id) {
        return users.find(user => user.id === id);
    }

// User leaves chat
    function userLeave(id) {
        const index = users.findIndex(user => user.id === id);  //DataBase Needed

        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }

// Get room users
    function getRoomUsers(room) {
        return users.filter(user => user.room === room);
    }
//-------------------------------------------------------------------


    async function  getUserNames(currentRoomIId){
        return await mysqlDB.chatUsersName(currentRoomIId)
    }
    
}


