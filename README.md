# Rethink Node Chat Server.

> A RethinkDB chat server with NodeJS Hapi framework.

The idea is to demonstrate how to to build a real time chat server with RethinkDB, HapiJS(NodeJS) and socket.io .

# Complete stack #

* [RethinkDB](https://www.rethinkdb.com)
* [thinky](http://thinky.io/)
* [node.js](http://nodejs.org)
* [hapi.js](https://hapijs.com)
* [socket.io](http://socket.io)

HOW TO RUN
========
1. Create a rethinkDB database named 'rethinkchat' (If you don't have RethinkDB installed, you can follow [these instructions to get it up and running](http://www.rethinkdb.com/docs/install/).)
2. Clone the project from git.
3. Go to 'rethink-node-chat-server' directory ( `cd rethink-node-chat-server` ).
4. Run `yarn` or `npm install` .
5. If you have different database configurations then you can change the index.js file under ./src/config directory and config.js file under ./rethinkdb-config directory.
6. Run `npm run initapp` to populate database with dummy data (windows users should replace initapp script with `SET NODE_ENV=development & node scripts/init-dev.js` in package.json file).
5. Run `npm start` to start the server.

API server will start at 'http://localhost:3030' and chat server(socket) will start at 'http://localhost:5000' but you will have to configure the chat client app at 'https://github.com/arman37/rethink-node-chat-client' to see how the API & Socket work.