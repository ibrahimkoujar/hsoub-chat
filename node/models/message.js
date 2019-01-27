/**
 * Mongoose Module.
 */
const mongoose = require('mongoose');

/**
 * Mongoose Schema.
 */
const Schema = mongoose.Schema;

/**
 * Define User Schema.
 */
const ModelSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
	receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
    	type:String,
		required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const User = mongoose.model('Message', ModelSchema);

module.exports = User;
