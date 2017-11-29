/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const cleanDB = require('./../scripts/clean-db');
const populateDB = require('./../scripts/populate-db');

Promise
    .resolve(cleanDB())
    .then(populateDB)
    .then(() => {
        console.log('\n\n DB initialization finished successfully!!!');
    })
    .catch((err) => {
        console.log('\n\n Oops! DB initialization failed terribly!!!\n', 'error: ', err);
    });