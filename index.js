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

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log("User added " + userId);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });

    socket.on("startSpinning", body => {
        console.log("Got Start Spinning Command")
        const receiverId = body.body.receiverId;
        const senderId = body.id;
        console.log("receiver id when start spinning " + receiverId);
        const user = getUser(receiverId);
        console.warn(body.body);
        console.warn(socket.id);
        console.warn("This is the senderId");
        console.warn(senderId);

        try {
            io.to(user.socketId).emit("startedSpin",body);

        } catch(e){
            console.log(" receiver id " + body.body.receiverId + " seems to be not in array " + users);
        }

    });

    socket.on("initWheel", body => {
        const user = getUser(body.body.receiverId);
        const receiverId = body.body.receiverId;
        const senderId = body.id;
        console.log("wheel was initialised");
        console.log("THis is the receiverId " + body.body.receiverId);
        console.warn(body.body);
        console.warn(socket.id);
        console.warn("This is the senderId");
        console.warn(senderId);

        try{
            io.to(user.socketId).emit("wheelInitialised",body);
        }catch(e){
            console.log(" receiver id " + body.body.receiverId + " seems to be not in array " + users);
        }
    });

    socket.on("setBet", body => {
        const user = getUser(body.body.receiverId);
        const receiverId = body.body.receiverId;
        const senderId = body.id;
        console.log("wheel was initialised");
        console.log("This is the receiverId " + body.body.receiverId);
        console.warn(body.body);
        console.warn(socket.id);
        console.warn("This is the senderId");
        console.warn(senderId);

        try {
            io.to(user.socketId).emit("betWasSet", body);
        } catch (e) {
            console.log(" receiver id " + body.body.receiverId + " seems to be not in array " + users);
        }
    });
})

