/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const config = require('../config');
const thinky = require('thinky')(config.rethinkdb);

module.exports = thinky;