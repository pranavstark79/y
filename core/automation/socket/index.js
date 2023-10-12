const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let totalUsers = 0;
//When client gets connected
io.on('connection', (socket) => {
  totalUsers++;
  console.log(
    `a user is connected with id: ${socket.id}, total users: ${totalUsers}`
  );
  setInterval(() => {
    io.emit('data', { time: new Date().toISOString() });
  }, 200);

  socket.on('disconnect', () => {
    totalUsers--;
    console.log(`a user is disconnected, total users: ${totalUsers}`);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
