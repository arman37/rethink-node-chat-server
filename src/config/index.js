/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

module.exports = {
    rethinkdb: {
        host: "127.0.0.1",
        port: 28015,
        db: 'rethinkchat'
    },
    hapi: {
        port: 3030
    },
    socket: {
        port: 5000
    },
  jwt: {
      key: 'secret_key'
  }
};