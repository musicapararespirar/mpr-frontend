const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  onlineLink: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  isGift: {
    type: Boolean,
    required: true
  },
  durationSeconds: {
    type: Number
  },
  requester: {
    name: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    isListener: {
      type: Boolean,
      required: true
    },
    timezone: {
      type: String,
      required: true
    }
  },
  listener: {
    name: {
      type: String
    },
    number: {
      type: Number
    },
    email: {
      type: String
    },
    placeName: {
      type: String
    },
    placeLatitude: {
      type: Number
    },
    placeLongitude: {
      type: Number
    },
    isInstitution: {
      type: Boolean,
      required: true
    },
    timezone: {
      type: String,
      required: true
    },
    language: {
      type: String
    }
  },
  musician: {
    isPreferred: {
      type: Boolean,
      required: true
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  },
  time: {
    dateAddedUTC: {
        type: Date,
        default: Date.now
    },
    asap: {
      type: Boolean,
      required: true
    },
    dateForUTC: {
      type: Date
    },
  },
  notes: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
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
