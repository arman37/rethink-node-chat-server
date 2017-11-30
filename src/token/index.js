/**
 * @author arman
 * @since 5/26/17
 *
 */
'use strict';

const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const secretKey = process.env.JWT || 'stubJWT';
  const options = {id: user.id, username: user.username};

  return jwt.sign(options, secretKey, { expiresIn: '18h' });
};