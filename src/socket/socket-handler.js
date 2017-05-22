/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

const appConstant = require('../app-constant');
const connectedUsers = {};
let io, socket;

let onConnection = function(sckt) {
  console.log('new connection...');
  let connectedUser = {};
  io = this;
  socket = sckt;

  socket.on(appConstant.CLIENT_CONNECTION, _handleClientConnect.bind(null, connectedUser));

  socket.on(appConstant.DISCONNECT, _handleClientDisconnect.bind(null, connectedUser));
};

let _handleClientConnect = (connectedUser, userId) => {
  require('../user/user-handler')
    .getUser(userId)
    .then((user) => {
      if(user) {
        connectedUser.id = user.id;
        connectedUser.username = user.username;
        connectedUsers[user.id] = connectedUser;
        io.sockets.emit(appConstant.NEW_USER_CONNECTION, connectedUsers);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let _handleClientDisconnect = (connectedUser) => {
  console.log('user disconnected', connectedUser.username);
  delete connectedUsers[connectedUser.id];
  io.sockets.emit(appConstant.NEW_USER_CONNECTION, connectedUsers);
};

let onCreateNewRoom = (feed) => {
  feed.each((err, model) => {
    if(err) {
      console.log(err);
      process.exit(1);
    }

    io.sockets.emit(appConstant.NEW_ROOM, model);
  });
};

module.exports = {
  onConnection: onConnection,
  onCreateNewRoom: onCreateNewRoom
}