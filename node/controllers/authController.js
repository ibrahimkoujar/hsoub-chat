/**
 * User Model.
 */
const User = require('../models/user');

/**
 * HttpErrors Module.
 */
const createError = require('http-errors');

/**
 * User login.
 * @param req {username, password}
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    const { username, password} = req.body;
    User.findOne({username})
    .then(user => {
        if (!user || !user.checkPassword(password)) throw createError(401, "Wrong username or password");
        res.json(user.signJwt());
    })
    .catch(next);
};

/**
 * User Registration.
 * @param req {name, username, password}
 * @param res
 * @param next
 */
exports.register = (req, res, next) => {
    let data = { name, username, password } = req.body;
    User.create(data)
    .then(user => {
        sendNewUser(user);
        res.json(user.signJwt());
    })
    .catch(next);
};

/**
 * Send new user to all.
 * @param user
 */
const sendNewUser = (user) => {
    let data = { name, username, avatar } = user;
    io.emit('new_user', data);
};