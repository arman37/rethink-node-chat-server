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

/**
 * Get a list of all chat rooms.
 *
 * @returns {*}
 */
let getRoomList = () => {
  return (
    ChatRoom
      .then((rooms) => {
        return rooms;
      })
  );
};

module.exports = {
  createRoom: createRoom,
  getRoomList: getRoomList
};