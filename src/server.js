/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Blipp = require('blipp');

const Auth = require('./auth');
const User = require('./user');
const Config = require('./config');
const Socket = require('./socket');
const Message = require('./message');
const ChatRoom = require('./chat-room');
const models = require('./models');

const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || Config.hapi.port,
  labels: ['api'],
  routes: {
    cors: {
      origin: ['*'],
      maxAge: 600,
      headers: ['Accept', 'Content-Type', 'Authorization', 'room']
    }
  }
});

server.connection({ port: Config.socket.port, labels: ['chat'] });

let goodOptions = {
  includes: {
    request: ['payload']
  },
  reporters: {
    console: [
      {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*', request: '*', error: '*' }]
      },
      {
          module: 'white-out',
          args: [{
              password: 'censor'
          }]
      },
      {
          module: 'good-console'
      },
      'stdout'
    ]
  }
};

server.register(
    [
      {
          register: Good,
          options: goodOptions
      },
      Auth,
      Blipp,
      User,
      Message,
      ChatRoom,
      Socket
    ]
  )
  .catch((err) => {
    console.log(err);
  });

server.start(function (err) {
  if (err) {
      throw err;
  }
  server.log(['info'], `API Server running at port: ${server.connections[0].info.uri}`);
  server.log(['info'], `Chat Server running at port: ${server.connections[1].info.uri}`);
});
