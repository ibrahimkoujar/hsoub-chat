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
    created_at: {
        type: Date,
        default: Date.now
    },
});

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

const User = mongoose.model('Message', ModelSchema);

module.exports = User;
