/**
 * User Model.
 */
const User = require('../models/user');

/**
 * HttpErrors Module.
 */
const createError = require('http-errors');

/**
 * JsonWebToken Module.
 */
const jwt = require('jsonwebtoken');

/**
 * User login.
 * @param req.body {username, password}
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
    .then(user => {
        if (!user || !user.checkPassword(req.body.password)) throw createError(401);
        let data = user.signJwt();
        res.json(data);
    }).catch(next);
};

/**
 * User Registration.
 * @param req.body {username, password}
 * @param res
 * @param next
 */
exports.register = (req, res, next) => {
    let data = { name, username, password } = req.body
    User.create(data)
    .then(user => {
        let data = user.signJwt();
        io.emit('new_user', data);
        res.json(data);
    })
    .catch(next);
};
