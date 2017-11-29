/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';
const bcrypt = require('bcrypt');

module.exports = () => {
    const {User, Message, ChatRoom} = require('../src/models/index');

    console.log('Started populating DB...');
    return Promise.all([
      {
        username: 'user1',
        password: bcrypt.hashSync('123456', 8),
      },
      {
        username: 'user2',
        password: bcrypt.hashSync('abcdef', 8)
      }
    ].map((user) => {
        console.log('Saving ', user.username, '...');
        return (new User(user)).save();
    }))
    .then((users) => {
        console.log('\nFinished saving all documents...\n', users);
    })
    .catch((err) => {
        console.log(err);
    });
};