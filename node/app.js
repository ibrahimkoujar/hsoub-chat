/**
 * Incldue .env config file to app process
 */
require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

/**
 * Json Web Token
 */
const auth = require('./middlewares/auth');
const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');

const app = express();

/**
 * Express Middlewares.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */
app.use('/auth', authRouter);
app.use('/message', messageRouter);
app.use('/user', userRouter);

/**
 * Errors handling
 */
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    if(err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError'){
        err.status = 422;
    }
    res.status(err.status || 500).json({message: err.message || "some error occurred."});
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,  useCreateIndex: true}, err => {
    if(err) throw err;
    console.log('Connected successfully');

});

/**
 * Socket.IO
 */
const io = require('socket.io')();

io.use(auth.socket)

io.on("connection", socket => {

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

});
io.listen(8000);

module.exports = app;
