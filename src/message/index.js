/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const Joi = require('joi');
const appConstant = require('../app-constant');
const messageHandler = require('./message-handler');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/api/v1/message',
      config: {
        validate: {
          payload: {
            room: Joi.string().trim().required(),
            from: Joi.string().trim().required(),
            message: Joi.string().trim().required()
          }
        }
      },
      handler: (req, reply) => {
        let {room, from, message} = req.payload;
        messageHandler
          .saveMessage(message, from, room)
          .then((user) => {
            reply(user).created(`/api/v1/sign-up/${user.id}`);
          })
          .catch((err) => {
            reply(err);
          });
      }
    },
    {
      method: 'GET',
      path: '/api/v1/message',
      handler: (req, reply) => {
        let roomId = req.query.roomId;

        messageHandler
          .getMessage(roomId)
          .then((messages) => {
            reply(messages);
          })
          .catch((err) => {
            reply(err);
          });
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: appConstant.MESSAGE,
  version: appConstant.V1
};
