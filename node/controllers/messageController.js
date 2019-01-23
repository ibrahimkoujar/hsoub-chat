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
    let data = [];
    res.json(data);
};
