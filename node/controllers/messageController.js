/**
 * User Model.
 */
const Message = require('../models/message');

/**
 * User login.
 * @param req.body {username, password}
 * @param res
 * @param next
 */
exports.all = (req, res, next) => {
    let userId = req.user.id;
    Message.find()
    .or([{sender: userId}, {receiver: userId}])
    .then(messages => res.json(messages))
    .catch(next);
};
