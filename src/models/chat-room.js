/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const thinky = require('../thinky');
const type = thinky.type;
const r = thinky.r;

const ChatRoom = thinky.createModel("chat_rooms", {
  name: type.string().min(3).max(16).required(),
  created_by: type.string().required(),
  createdAt: type.date().default((r.now()))
});

ChatRoom.ensureIndex("createdAt");

module.exports = ChatRoom;