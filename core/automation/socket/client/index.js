const { io } = require('socket.io-client');
const SERVER_URL = `http://localhost:3000`;

const socket = io(SERVER_URL);

socket.on('connect', () => {
  const status = socket.connected;
  console.log(`Socket connected`, status);
});

socket.on('disconnect', () => {
  const status = socket.connected;
  console.log(`Socket Connected`, status);
});

socket.on('data', (data) => {
  console.log('data received:', JSON.stringify(data, null, 4));
});
