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
 * Define User Schema.
 */
const ModelSchema = new mongoose.Schema({
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
 * Get user data.
 */
ModelSchema.methods.getData = function(){
    return { id: this._id, name: this.name, username: this.username, about: this.about, avatar: this.avatar };
};

/**
 * Generate user token.
 */
ModelSchema.methods.signJwt = function(){
    let data = this.getData();
    data.token = jwt.sign(data, process.env.JWT_SECRET);
    return data;
};

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
    return bcrypt.compareSync(password, this.password);
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

const Model = mongoose.model('User', ModelSchema);

module.exports = Model;
