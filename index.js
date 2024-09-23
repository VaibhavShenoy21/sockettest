const express = require('express');
const socket = require('socket.io');
const connection = require('./connection.js'); // Connection events like 'create' and 'change'

const app = express();

// Enable CORS for all HTTP requests
const cors = require('cors');
app.use(cors());

// Start the server
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Initialize socket.io with CORS configuration
const io = socket(server, {
  cors: {
    origin: "https://ang-socket.onrender.com", // Replace this with your frontend URL
    methods: ["GET", "POST"],                  // Allowed methods
    credentials: true                          // Allow credentials if needed
  }
});

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
