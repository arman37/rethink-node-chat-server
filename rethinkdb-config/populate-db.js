/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

module.exports = () => {
    const {User, Message, ChatRoom} = require('../src/models');

    console.log('Started populating DB...');
    return Promise.all([
      {
        username: 'user1',
        password: '123456',
      },
      {
        username: 'user2',
        password: 'abcdef'
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