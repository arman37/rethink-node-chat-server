/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const Joi = require('joi');
const appConstant = require('../app-constant');
const userHandler = require('./user-handler');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/api/v1/sign-up',
      config: {
        validate: {
          payload: {
            username: Joi.string().trim().min(3).max(20).required(),
            password: Joi.string().trim().min(6).max(30).required()
          }
        }
      },
      handler: (req, reply) => {
        let {username, password} = req.payload;
        userHandler
          .saveUser(username, password)
          .then((user) => {
            reply(user).created(`/api/v1/sign-up/${user.id}`);
          })
          .catch((err) => {
            reply(err);
          });
        console.log(req.payload);
      }
    },
  ]);

  next();
};

exports.register.attributes = {
  name: appConstant.SIGNUP,
  version: appConstant.V1
};
