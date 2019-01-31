const mongo = require('./db/mongo.js');

const listEvents = (parentValue, args, ctx)=>{
  return mongo.listEvents().then((evts)=>{
      return evts;
  });
};

const getEvent = (parentValue, args, ctx) => {
  return mongo.getEvent(args.id).then((evt)=>{
    return evt;
  });
};

module.exports = {
  getEvent,
  listEvents,
};
