"use strict";

const http       = require('http');
const mongoose   = require('mongoose');

const api        = require('./src/api');
const config     = require('./src/config');


// Set the port to the API.
api.set('port', config.port);

//Create a http server based on Express
const server = http.createServer(api);

// connect socket.io for game
const socket = require("socket.io");
const io = socket(server);

//Connect to the MongoDB database; then start the server
mongoose
    .connect(config.mongoURI)
    .then(() => server.listen(config.port))
    .catch(err => {
        console.log('Error connecting to the database', err.message);
        process.exit(err.statusCode);
    });

server.on('listening', () => {
    console.log(`API is running in port ${config.port}`);
});

server.on('error', (err) => {
    console.log('Error in the server', err.message);
    process.exit(err.statusCode);
});

// connect socket.io for game
io.on("connection", socket => {
    console.warn("your id")
    console.warn(socket.id)

    socket.emit("your id", socket.id);

    socket.on("send message", body => {
        console.warn("got message with ID:")
        console.warn(body)
        console.warn(socket.id)
        console.warn("body Id")
        console.warn(body.id)
        if (body.id === "60f2aed3ba41ccd256b3707e" || body.id === "60f2ae88ba41ccd256b37068") {
            io.emit("message", body)
        }
    })
})

