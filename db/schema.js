const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: false,
    required: true,
    auto: true,
  },
  activity: {
    name: {
      type: String
    },
    type: {
      type: String
    },
  },
  speaker: {
      fullname: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String,
        required: false,
      },
      team: {
        type: String,
        required: false,
      },
      company: {
        type: String,
        required: false,
      },
      fee: {
        type: Number,
        required: false,
      },
  },
  votes:[{
    name: {
      type: String
    },
    score: {
      type: Number
    },
    comment: {
      type: String
    },
  }],
});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
  Event,
};
