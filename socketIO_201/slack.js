const express = require("express");
const app = express();
const socketio = require("socket.io");
const namespaces = require("./data/namespaces.js");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

// build an array to send back with the img and endpoint for each NS
const nsData = namespaces.map((namespace) => {
  return {
    img: namespace.img,
    endpoint: namespace.endpoint,
  };
});

// io.on = io.of('/').on
io.on("connection", (socket) => {
  // Use socket, NOT io, because we want it to go to just this particular client.
  socket.emit("nsList", nsData);
});

// loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`);
    // a socket has connected to one of our chatgroup namespaces.
    // send that ns gorup info back
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
  });
});
