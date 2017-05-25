/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const {Message} = require('../models');

/**
 * Save a new message.
 *
 * @param message
 * @param from
 * @param room
 * @returns {Promise.<Object>}
 */
let saveMessage = (message, from, room) => {
  return (
    new Message({message, from, room})
      .save()
      .then((message) => {
        return message;
      })
  );
};

/**
 * Return a list of messages for a particular room.
 *
 * @param roomId
 * @returns {Promise.<Object>}
 */
let getMessage = (roomId) => {
  return (
    Message
      .filter({room: roomId})
      .getJoin({user: true})
      .skip(0)
      .limit(1000)
      .orderBy('createdAt')
      .then((messages) => {
        return messages;
      })
  );
};

module.exports = {
  getMessage: getMessage,
  saveMessage: saveMessage
};