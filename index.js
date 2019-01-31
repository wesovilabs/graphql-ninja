const express = require('express');
const { gql, ApolloServer,makeExecutableSchema } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const fs = require('fs');
const path = require('path');
const query = require('./query');
const mutation = require('./mutation');
const connection = require('./db/connection');
const config = require('./config.js');
const {pubsub} = require('./pubsub');
const {MESSAGE_EVENTS} = require('./events');

const { withFilter } = require('graphql-subscriptions');
const { createServer } =require('http') ;
require('dotenv').config();

const typeDefs = importSchema('./schema.graphql');

const resolvers = {
  Speaker: {
    __resolveType(obj, context, info){
      if(obj.company){
        return 'ExternalSpeaker';
      }
      return 'Employee';
    },
  },
  ExternalSpeaker: {
    fee: ({ fee }, { currency }) => currency === 'Euro' ? fee : fee * 1.14
  },
  Query: query,
  Mutation: mutation,
  Subscription: {
    checkNewVotes: {
      subscribe: (
        (_, args) => {
          console.log(`${MESSAGE_EVENTS.CREATED}.${args.eventId}`);
          return pubsub.asyncIterator(`${MESSAGE_EVENTS.CREATED}.${args.eventId}`);
        }
      ),
      resolve: (payload, args, context, info) => {
        return payload;
      }
    }
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
});



connection.connect();
const app = new express();

const server = new ApolloServer({
  schema,
});
server.applyMiddleware({ app});
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: config.get('server.port') }, () => {
  console.log(`🚀 Server ready at http://localhost:${config.get('server.port')}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${config.get('server.port')}${server.subscriptionsPath}`);
});
