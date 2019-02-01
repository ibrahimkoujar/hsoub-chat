/**
 * User Model.
 */
const User = require('../models/user');

/**
 * HttpErrors Module.
 */
const createError = require('http-errors');

/**
 * Change password.
 * @param req {password, newPassword}
 * @param res
 * @param next
 */
exports.password = (req, res, next) => {
    const { password, newPassword} = req.body;
    User.findById(req.user.id)
    .then(user => {
        if (!user || !user.checkPassword(password)) throw createError(401, "Wrong password");
        user.password = newPassword;
        return user.save();
    })
    .then(res.json())
    .catch(next);
};

/**
 * Change about message.
 * @param req {about}
 * @param res
 * @param next
 */
exports.profile = (req, res, next) => {
    const id = req.user.id;
    const { name, about } = req.body;
    const avatar = req.file ?  req.file.filename : '';
    User.findById(id).then(user => {
        user.name = name;
        user.about = about;
        user.avatar= avatar;
        return user.save();
    })
    .then(updated => {
        sendUpdateUser(updated);
        res.json();
    })
    .catch(next);
};

/**
 * Send update user to all.
 * @param user
 */
const sendUpdateUser = (user) => {
    let data = { id, name, username, avatar, about } = user;
    io.emit('update_user', data);
};