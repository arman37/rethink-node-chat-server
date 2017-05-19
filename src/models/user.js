/**
 * @author arman
 * @since 5/9/17
 *
 */
'use strict';

const thinky = require('../thinky');
const Message = require('./message');
const type = thinky.type;
const r = thinky.r;

const User = thinky.createModel("users", {
    id: type.string(),
    username: type.string().min(3).max(20).options({enforce_type: "strict"}),
    password: type.string().min(6).max(60).options({enforce_type: "strict"}),
    createdAt: type.date().default((r.now()))
});

User.ensureIndex("createdAt");

module.exports = User;