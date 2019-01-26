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
io = require('socket.io')();

/**
 * Routers
 */
const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');

// Express Application
const app = express();
// Socket.io
app.io = io;

/**
 * Express Middleware's.
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
    if(err.name === 'MongoError' || err.name === 'ValidationError' || err.name === 'CastError'){
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
const socketHandler = require('./socket-handler');
io.use(socketHandler.auth)
io.on("connection", socketHandler.events);

module.exports = app;
