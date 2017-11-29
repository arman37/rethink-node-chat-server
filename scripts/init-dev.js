/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const thinky = require('../src/thinky');
const cleanDB = require('./clean-db');
const populateDB = require('./populate-db');

thinky
  .dbReady()
  .then(cleanDB)
  .then(populateDB)
  .then(() => {
    console.log('\n\n DB initialization finished successfully!!!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('\n\n Oops! DB initialization failed terribly!!!\n', 'error: ', err);
    process.exit(0);
  });
