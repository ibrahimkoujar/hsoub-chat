/**
 * Mongoose Module.
 */
const mongoose = require('mongoose');

/**
 * Bcrypt Module.
 */
const bcrypt = require('bcrypt');

/**
 * JsonWebToken Module.
 */
const jwt = require('jsonwebtoken');

/**
 * Mongoose Schema.
 */
const Schema = mongoose.Schema;

/**
 * Define User Schema.
 */
const ModelSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
    	type:String,
		required: true,
		unique: true,
        maxlength: 20
	},
    password: {
        type: String,
        required: true
    },
    about:  {
        type: String,
        maxlength: 100
    },
    avatar: String,
});

/**
 * Pre save middleware
 * @param next
 */
ModelSchema.pre('save', function(next) {
    if(this.isNew || this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 8);
    }
    next();
});

/**
 * Check if given password is correct.
 * @param password
 */
ModelSchema.methods.checkPassword = function(password){
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

/**
 * Generate user token.
 */
ModelSchema.methods.signJwt = function(){
    let user = this;
    let data = {
        id:user._id,
        name: user.name,
        username:user.username,
        about:user.about,
        avatar:user.avatar
    };
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

/**
 * Append id attribute.
 */
ModelSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

/**
 * Enable attributes.
 */
ModelSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', ModelSchema);

module.exports = User;
