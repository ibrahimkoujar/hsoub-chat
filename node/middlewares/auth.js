/**
 * User Model
 */
const User = require('../models/user');

/**
 * Http Errors
 */
const createError = require('http-errors');

/**
 * Json Web Token
 */
const jwt = require('jsonwebtoken');

/**
 * LoggedIn
 * @param req
 * @param res
 * @param next
 */
exports.authenticated  = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) throw createError(401);
        req.user = decoded;
        next();
    });
};

/**
 * Guest middleware
 * @param req
 * @param res
 * @param next
 */
exports.guest = (req, res, next) => {
    let token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return next();
        throw createError(403);
    });
};

/**
 * Socket.io middleware 
 * @param req
 * @param res
 * @param next
 */
exports.socket = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) return next(new Error('Authentication error'));
            socket.user = decoded;
            next();
        });
    } else {
        next(new Error('Authentication error'));
    }
};
