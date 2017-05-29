/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const {User, Message} = require('../models');
const bcrypt = require('bcrypt');
const Boom = require('boom');

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
      .then((user) => {
        return user;
      })
  );
};

/**
 * Verify unique user.
 *
 * @param req
 * @param res
 * @returns {Promise.<Object>}
 */
let verifyUniqueUser = (req, res) => {
  User
    .filter({username: req.payload.username})
    .then((user) => {
      if(user.length) {
        res(Boom.badRequest('Username taken'));
      }else {
        res(req.payload);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let verifyCredentials = (req, res) => {
  User
    .filter({username: req.payload.username})
    .then((user) => {
      if(user.length) {
        return bcrypt.compare(req.payload.password, user[0].password)
          .then((isValid) => {
            if(isValid) {
              res(req.user = user[0]);
            }else {
              res(Boom.badRequest('Incorrect password!'));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }else {
        res(Boom.badRequest('Incorrect username or email!'));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUser: getUser,
  saveUser: saveUser,
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
};