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
    listenerTimezone: {
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
    scheduled: {
        type: Boolean,
        default: false
    },
    requestState: {
        type: String
    },
    requestType: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    notes: [
        {
            coordinator: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Concert = mongoose.model('concert', ConcertSchema);
