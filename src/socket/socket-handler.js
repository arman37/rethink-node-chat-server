/**
 * @author arman
 * @since 5/22/17
 *
 */
'use strict';

const appConstant = require('../app-constant');
const connectedUsers = {};
const connections = {};
let io, socket;

let onConnection = function(sckt) {
  console.log('new connection...');
  let connectedUser = {};
  io = this;
  socket = sckt;

  socket.on(appConstant.CLIENT_CONNECTION, _handleClientConnect.bind(null, connectedUser));

  socket.on(appConstant.DISCONNECT, _handleClientDisconnect.bind(null, connectedUser));

  socket.on('candidate', _handleCandidate);

  socket.on('offer', _handleCallOffer);

  socket.on('answer', _handleAnswer);

  socket.on('leave', _handleLeave);
};

let _handleCandidate = (data) => {
  console.log("Sending candidate to callee: ", data.callee);
  let connection = connections[data.callee];

  if (connection) {
    connection.emit('candidate', {
      candidate: data.candidate
    });
  }
};

let _handleCallOffer = (data) => {
  console.log("Sending offer to callee: ", data.callee);           //for ex. UserA wants to call UserB

  let connection = connections[data.callee];          //if UserB exists then send him offer details

  if (connection) {
    connection.emit('offer', {
      offer: data.offer,
      callee: data.callee,
      caller: data.caller
    });
  }
};

let _handleAnswer = (data) => {
  console.log("Sending answer to caller: ", data.caller);
  //for ex. UserB answers UserA
  let connection = connections[data.caller];

  if (connection) {
    connection.emit('answer', {
      answer: data.answer
    });
  }
};

let _handleLeave = (data) => {
  console.log("Disconnecting from ", data.name);
  let connection = connections[data.name];

  //notify the other user so he can disconnect his peer connection
  if(connection) {
    connection.emit('leave');
  }
};

let _handleClientConnect = (connectedUser, userId) => {
  require('../user/user-handler')
    .getUser(userId)
    .then((user) => {
      if(user) {
        connectedUser.id = user.id;
        connectedUser.username = user.username;
        connectedUsers[user.id] = connectedUser;
        connections[user.username] = socket;
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

    io && io.sockets.emit(appConstant.NEW_ROOM, model);
  });
};

let onNewMessage = (feed) => {
  feed.each((err, model) => {
    if(err) {
      console.log(err);
      process.exit(1);
    }

    require('../user/user-handler')
      .getUser(model.from)
      .then((user) => {
        model.user = user;
        io.sockets.emit(appConstant.New_MESSAGE, model);
      })
      .catch((err) => {
        console.log(err)
      });
  });
};

module.exports = {
  onConnection,
  onNewMessage,
  onCreateNewRoom,
};