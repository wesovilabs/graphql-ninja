const schema = require('./db/schema.js');
const mongo = require('./db/mongo.js');
const {MESSAGE_EVENTS} = require('./events');
const {pubsub} = require('./pubsub');

const createEvent= (parentValue, args, ctx)=>{
  let activity = {
    name: args.event.activity.name,
    type: args.event.activity.type,
  };
  let speaker = {};
  if (args.event.speaker.externalSpeaker) {
    speaker.fullname= args.event.speaker.externalSpeaker.fullname,
    speaker.email= args.event.speaker.externalSpeaker.email,
    speaker.company=args.event.speaker.externalSpeaker.company;
    speaker.fee=args.event.speaker.externalSpeaker.fee;
  } else {
    speaker.fullname= args.event.speaker.employee.fullname,
    speaker.email= args.event.speaker.employee.email,
    speaker.team =  args.event.speaker.employee.team;
  }
  console.log(speaker);
  let event = schema.Event({
    activity: activity,
    speaker: speaker,
    votes:[]
  });

  return mongo.createEvent(event).then((evt)=>{
      return evt;
  });
};


const vote = (parentValue, args, ctx)=>{
  let vt = {
    name: args.request.name,
    score: args.request.score,
    comment: args.request.comment,
  };
  return mongo.addVote(args.request.eventId,vt).then((_)=>{
    console.log(`${MESSAGE_EVENTS.CREATED}.${args.request.eventId}`);
    pubsub.publish(`${MESSAGE_EVENTS.CREATED}.${args.request.eventId}`, vt);
    return vt;
  }).catch((err)=>err);
};


module.exports = {
  createEvent,
  vote,
};
