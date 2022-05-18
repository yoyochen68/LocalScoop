
module.exports = function(io) {




    // Run when client connects
    io.on('connection', socket => {
        // console.log("IO is connected now ")

        socket.emit('message', formatMessage('admin', 'you have been born!'))

        // socket.on('joinRoom', ({username, room})=>{
        //     socket.emit('message', formatMessage('admin', 'you have been born!'))
        //
        // } )

        //listen for chatInputMessage
        socket.on('chatMessage',(msg)=>{
            io.emit('message', formatMessage('USER',msg) )
        })


        socket.on ('disconnect',()=>{
            io.emit('message',formatMessage('admin', 'user is dead'))
        })

    });







    ///----------------------------------move to db/different file--------------------
    // const formatMessage = require('../views/chat/utils/messages')
    //moving it in searate file later
    const moment = require('moment');
    const users=[]

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
//
// // User leaves chat
//     function userLeave(id) {
//         const index = users.findIndex(user => user.id === id);
//
//         if (index !== -1) {
//             return users.splice(index, 1)[0];
//         }
//     }
//
// // Get room users
//     function getRoomUsers(room) {
//         return users.filter(user => user.room === room);
//     }
//-------------------------------------------------------------------

}


