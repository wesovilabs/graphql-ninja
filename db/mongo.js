const {Event} = require('./schema.js');
const mongoose = require('mongoose');

const createEvent = (event) => {
  return event.save();
};

const listEvents = (event) => {
  return Event.find({});
};

const getEvent = (eventId) => {
  return Event.findById(eventId);
};

const addVote = (eventId,vote) => {
  return Event.findOneAndUpdate(
    {
      _id: eventId,
    },
    {
      $push: {votes:vote},
    }
  );
};

module.exports = {
  getEvent,
  listEvents,
  createEvent,
  addVote,
};
