// server.js
const express = require('express');
const app = express();
const socket = require('socket.io');
const connection = require('./connection.js'); // Connection events like 'create' and 'change'

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Initialize socket.io
const io = socket(server);

// Handle connection
io.on('connection', (socket) => {
  console.log('New connection: ' + socket.id);

  // Handle 'change' event
  socket.on(connection.change, (changes) => {
    io.sockets.emit(connection.change, changes);
  });

  // Handle 'create' event
  socket.on(connection.create, (newData) => {
    io.sockets.emit(connection.create, newData);
  });
});
