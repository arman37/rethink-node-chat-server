/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const thinky = require('../src/thinky/index');
const config = require('./../rethinkdb-config/config');
const r = thinky.r;

module.exports = () => {
    console.log('Searching for table names...');
    return r
    .db(config[process.env.NODE_ENV].db)
    .tableList()
    .run()
    .then((tables) => {
        console.log('Found table list: ', tables, '\n Started dropping tables if exists any...');
        return Promise.all(tables.map((table) => {
            console.log('Dropping table: ', table);
            return r.db(config[process.env.NODE_ENV].db).tableDrop(table).run();
        }));
    })
    .then((results) => {
        console.log('Table Dropping finished...\n', results);
    });
};