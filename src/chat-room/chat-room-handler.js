/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const {ChatRoom} = require('../models');

/**
 * Save a new chatRoom.
 *
 * @param name
 * @param created_by
 * @returns {Promise.<Object>}
 */
let createRoom = (name, created_by) => {
  return (
    new ChatRoom({name, created_by})
      .save()
      .then((room) => {
        return room;
      })
  );
};

module.exports = {
  createRoom: createRoom
};