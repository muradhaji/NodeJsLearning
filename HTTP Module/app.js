const http = require('node:http');

// const server = http.createServer();
const server = http.createServer((req, res) => {
  if (req.url === `/`) {
    res.write(`Hello World!`);
    res.end();
  }

  if (req.url === `/api`) {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on(`connection`, (socket) => {
//   console.log(`New connection..`);
// });

server.listen(3000);

console.log(`Listening on port 3000..`);

// Learn other methods
