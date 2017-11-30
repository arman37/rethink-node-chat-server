/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const thinky = require('../thinky');
const type = thinky.type;
const r = thinky.r;

const Message = thinky.createModel("messages", {
  message: type.string().min(1).max(200).options({enforce_type: "strict"}),
  from: type.string().options({enforce_type: "strict"}),
  room: type.string(),
  createdAt: type.date().default((r.now()))
});

Message.ensureIndex("createdAt");

module.exports = Message;

