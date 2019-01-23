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
 * @param req.body {username, password}
 * @param res
 * @param next
 */
exports.all = (req, res, next) => {
    let where = { _id: { $ne: req.user.id } };
    User.find(where)
    .select('-password')
    .then(users => {
        res.json(users);
    }).catch(next);
};
