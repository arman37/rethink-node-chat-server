/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';
const bcrypt = require('bcrypt');

const users = [
  {
    username: 'user1',
    password: bcrypt.hashSync('123456', 8),
    id: '9d1760e6-175e-4fcb-adba-e26ddc8a14d8'
  },
  {
    username: 'user2',
    password: bcrypt.hashSync('123456', 8),
    id: 'ab4c8d8b-385c-48eb-a098-0cd6cf38d008'
  }
];

const chatRooms = [
  {
    name: 'Room1',
    id: '9d1760e6-175e-4fcb-adba-e26ddc8a1456',
    created_by: '9d1760e6-175e-4fcb-adba-e26ddc8a14d8',
  },
  {
    name: 'Room2',
    id: 'ab4c8d8b-385c-48eb-a098-0cd6cf38d369',
    created_by: 'ab4c8d8b-385c-48eb-a098-0cd6cf38d008'
  }
];

module.exports = () => {
  const {User, Message, ChatRoom} = require('../src/models/index');
  console.log('Started populating DB...');

  return Promise.all(
    users.map((user) => {
      console.log('Saving ', user.username, '...');
      return (new User(user)).save();
    })
  )
  .then((users) => {
    console.log('\nFinished saving all documents...\n', users);
    return Promise.all(
      chatRooms.map((room) => {
        return (new ChatRoom(room)).save();
      })
    );
  })
  .then((rooms) => {
    console.log('\nFinished saving all chat rooms...\n', rooms);
  })
  .catch((err) => {
      console.log(err);
  });
};