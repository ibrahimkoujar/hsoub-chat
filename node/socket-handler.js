/**
 * Message Model.
 */
const Message = require('./models/message');

/**
 * Auth Middleware
 */
const auth = require('./middlewares/auth');

let users = {};

exports.auth = auth.socket;

exports.events = socket => {

    socket.emit('online_users', users);

    // Join to socket to user room.
    socket.join(socket.user.id);
    // Log user connected.
    console.log("New client connected: " + socket.user.username);
    users[socket.user.id] = true;

    let room = io.sockets.adapter.rooms[socket.user.id];

    if (room.length === 1) {
        io.emit('user_status', {[socket.user.id]: true});
    }

    // Log user disconnected.
    socket.on("disconnect", () => {
        if (!room || room.length < 1) {
            let lastSeen = new Date().getTime();
            users[socket.user.id] = lastSeen;
            io.emit('user_status', {[socket.user.id]: lastSeen});
        }
        console.log("Client disconnected: " + socket.user.username);
    });

    // User message event.
    socket.on("message", data => {
        // Sender ID
        let sender = socket.user.id;
        // Receiver ID
        let receiver = data.receiver;
        // Message body
        let message = {
            sender: sender, receiver: receiver, content: data.content, date: new Date().getTime()
        };
        Message.create(message);
        // Send message to target user.
        socket.to(receiver).emit('message', message);
        // Send message to sender sockets.
        socket.broadcast.to(sender).emit('sent_message', message);
    });

    // User typing event.
    socket.on("typing", receiver => {
        // Sender ID
        let sender = socket.user.id;
        // Send message to target user.
        socket.to(receiver).emit('typing', sender);
    });

    // Messages seen event.
    socket.on("seen", sender => {
        let receiver = socket.user.id;
        Message.updateMany({sender, receiver, seen: false}, {seen: true}, {multi: true}).exec();
    });

};
