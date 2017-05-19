/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const {User, Message} = require('../models');
const bcrypt = require('bcrypt');

/**
 * Save a new user.
 *
 * @param username
 * @param password
 * @returns {Promise.<Object>}
 */
let saveUser = (username, password) => {
  return (
    new User({username, password: bcrypt.hashSync(password, 8)})
      .save()
      .then((user) => {
        return user;
      })
  );
};

/**
 * Get an existing user.
 *
 * @param userId
 * @returns {Promise.<Object>}
 */
let getUser = (userId) => {
  return (
    User
      .get(userId)
      .getJoin({
        message: true
      })
      .then((user) => {
        return user;
      })
  );
};

module.exports = {
    getUser: getUser,
    saveUser: saveUser
};