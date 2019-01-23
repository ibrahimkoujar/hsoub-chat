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
    socket.on("disconnect", state => {
        console.log("Client disconnected: " + socket.user.username);
    });

    // User message event.
    socket.on("message", data => {
        // Sender ID
        let sender = socket.user.id;

        // Receiver ID
        let receiver = data.user_id;

        // Message body
        let message = {
            user_id: sender, content: data.content, date: new Date().getTime()
        };

        // Send message to target user.
        io.to(receiver).emit('message', message);

        // Send message to sender sockets.
        message.user_id = receiver;
        socket.broadcast.to(sender).emit('sent_message', message);

    });

    // User message event.
    socket.on("typing", data => {
        // Sender ID
        let sender = socket.user.id;
        // Receiver ID
        let receiver = data.user_id;
        // Message body
        let message = { user_id: sender };
        // Send message to target user.
        io.to(receiver).emit('typing', message);
    });

};
