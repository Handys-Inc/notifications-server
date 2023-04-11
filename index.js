const express = require('express');
const http = require('http');
const cors = require("cors");
const { Server } = require('socket.io');

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.options("*", cors());


const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Add event listeners for different services
  // Example: Booking service
  socket.on('booking_created', (booking) => {
    io.emit('new_booking', booking);
  });

  // Add more event listeners for other services as needed
});

const port = process.env.PORT || 3005;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
