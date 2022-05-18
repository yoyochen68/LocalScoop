
module.exports = function(io) {

    //moving it in searate file later
    const moment = require('moment');
    const users=[]
    //-------------------------------------------
    
    // Run when client connects
    io.on('connection', socket => {

        socket.on('joinRoom', ({ username, room }) => {
            const user = userJoin(socket.id, username, room);

            socket.join(user.room);

            // Welcome current user
            socket.emit('message', formatMessage("admin", 'Welcome to ChatCord!'));

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit(
                    'message',
                    formatMessage("admin", `${user.username} has joined the chat`)
                );




        } )




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


