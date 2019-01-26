/**
 * User Model.
 */
const User = require('../models/user');

/**
 * Get all users
 * @param req
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
