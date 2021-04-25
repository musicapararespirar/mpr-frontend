const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
    requesterName: {
        type: String
    },
    dateAdded:
        {
            type: Date,
            default: Date.now
        },
    reason: {
        type: String
    },
    preferredMusicianName: {
        type: String
    },
    preferredMusician: {
        type: Boolean
    },
    preferredMusicianObject: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    listenerMessage: {
        type: String
    },
    listenerName: {
        type: String
    },
    listenerLocation: {
        type: String
    },
    listenerNumber: {
        type: Number
    },
    asap: {
        type: Boolean
    },
    dateFor: {
        type: Date
    },
    requestType: {
        type: String,
        required: true
    }
});

module.exports = Concert = mongoose.model('concert', ConcertSchema);
