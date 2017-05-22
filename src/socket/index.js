/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const appConstant = require('../app-constant');
const socketHandler = require('./socket-handler');

exports.register = (server, options, next) => {
    var io = require('socket.io')(server.select('chat').listener);
    io.on(appConstant.CONNECTION, socketHandler.onConnection.bind(io));
    next();
};

exports.register.attributes = {
    name: appConstant.SOCKET,
    version: appConstant.V1
};