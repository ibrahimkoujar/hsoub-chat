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
    User.findOne({username: req.body.username})
    .then(user => {
        if (!user || !user.checkPassword(req.body.password)) throw createError(401);
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

const sendNewUser = (user) => {
    io.emit('new_user', {
        id: user.id, name: user.name, username: user.username, avatar: user.avatar
    });
};