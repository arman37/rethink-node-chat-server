/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const User = require('./user');
const Message = require('./message');
const ChatRoom = require('./chat-room');
const socketHandler = require('../socket/socket-handler');

/**
 * Relate ChatRoom to the Message
 *
 * @param  {Model}  Message - message model
 * @param  {string}  message - field name
 * @param  {string}  id - chatRoom primary key
 * @param  {string}  room - foreign key, chat room id in message model
 */
ChatRoom.hasMany(Message, 'message', 'id', 'room');

/**
 * Relate the User to the Message
 *
 * @param  {Model}  User - User model
 * @param  {string}  user - field name
 * @param  {string}  from - foreign key, user id in message model
 * @param  {string}  id - user primary key
 */
Message.belongsTo(User, 'user', 'from', 'id');

/**
 * Relate User with ChatRoom
 *
 * @param  {Model}  ChatRoom - ChatRoom model
 * @param  {string}  room - field name
 * @param  {string}  id - user primary key
 * @param  {string}  id - chatRoom primary key
 */
User.hasAndBelongsToMany(ChatRoom, 'room', 'id', 'id');

/**
 * Relate User with ChatRoom
 *
 * @param  {Model}  User - User model
 * @param  {string}  user - field name
 * @param  {string}  id - chatRoom primary key
 * @param  {string}  id - user primary key
 */
ChatRoom.hasAndBelongsToMany(User, 'user', 'id', 'id');

// add change feed listeners
ChatRoom
  .changes()
  .then(socketHandler.onCreateNewRoom);

Message
  .changes()
  .then(socketHandler.onNewMessage);

module.exports = {
  User: User,
  Message: Message,
  ChatRoom: ChatRoom
};