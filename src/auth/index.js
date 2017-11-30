/**
 * @author arman
 * @since 11/29/17
 *
 */
'use strict';

const jwt = require('hapi-auth-jwt2');

exports.register = (server, options, next) => {
  server.register(jwt, (err) => {
    if (err) {
      return next(err);
    }

    server.auth.strategy('jwt', 'jwt', true, {
      key: process.env.JWT || 'stubJWT',
      validateFunc: validate,
      verifyOptions: {
        algorithms: [ 'HS256' ],
        ignoreExpiration: true,
      }
    });

    return next();
  });
};

exports.register.attributes = {
  name: 'auth-jwt2',
  version: '1.0.0'
};

function validate(decoded, request, callback) {
  return callback(null, true, decoded);
}
