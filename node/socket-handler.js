/**
 * Message Model.
 */
const Message = require('./models/message');

/**
 * Json Web Token
 */
const auth = require('./middlewares/auth');

exports.auth = auth.socket;

exports.events = socket => {

    // Join to socket to user room.
    socket.join(socket.user.id);

    // Log user connected.
    console.log("New client connected: " + socket.user.username);

    // Log user disconnected.
    socket.on("disconnect", () => {
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

};
