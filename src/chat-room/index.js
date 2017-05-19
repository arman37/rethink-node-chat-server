/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const Joi = require('joi');
const appConstant = require('../app-constant');
const chatRoomHandler = require('./chat-room-handler');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/api/v1/room',
      config: {
        validate: {
          payload: {
            name: Joi.string().trim().required(),
            created_by: Joi.string().trim().required()
          }
        }
      },
      handler: (req, reply) => {
        let {name, created_by} = req.payload;
        chatRoomHandler
          .createRoom(name, created_by)
          .then((room) => {
            reply(room).created(`/api/v1/sign-up/${room.id}`);
          })
          .catch((err) => {
            reply(err);
          });
      }
    },
  ]);

  next();
};

exports.register.attributes = {
  name: appConstant.CHAT_ROOM,
  version: appConstant.V1
};
