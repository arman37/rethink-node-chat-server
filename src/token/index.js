/**
 * @author arman
 * @since 5/26/17
 *
 */
'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (user) => {
  return jwt.sign({ id: user.id, username: user.username}, config.jwt.key, { algorithm: 'HS256', expiresIn: "1h" } );
};