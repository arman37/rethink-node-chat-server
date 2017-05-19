/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const appConstant = require('../app-constant');
const messageHandler = require('../message');
const userHandler = require('../user/user-handler');
const connectedUsers = {};
let io;

exports.register = (server, options, next) => {
    io = require('socket.io')(server.select('chat').listener);
    io.on(appConstant.CONNECTION, _onNewConnection);
    next();
};

let _onNewConnection = (socket) => {
  let connectedUser = {};
  console.log('new connection');
  socket.on(appConstant.CLIENT_CONNECTION, (userId) => {
    userHandler
      .getUser(userId)
      .then((user) => {
        if(user) {
          connectedUser = user;
          connectedUsers[user.id] = connectedUser;
          io.sockets.emit(appConstant.NEW_USER_CONNECTION, connectedUsers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('disconnect', function() {
    console.log('user disconnected', connectedUser.username);
    delete connectedUsers[connectedUser.id];
    io.sockets.emit(appConstant.NEW_USER_CONNECTION, connectedUsers);
  });
};

exports.register.attributes = {
    name: appConstant.SOCKET,
    version: appConstant.V1
};