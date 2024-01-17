const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  let filePath = './otherFiles/404.html';

  switch (req.url) {
    case '/':
    case '/home':
      filePath = './otherFiles/home.html';
      res.statusCode = 200;
      break;
    case '/about':
      filePath = './otherFiles/about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.setHeader('Location', '/about');
      res.statusCode = 301;
      res.end();
      break;
    default:
      res.statusCode = 404;
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.write('Something went wrong!');
      console.log(err);
    } else {
      // res.write(data);
      res.end(data);
    }
  });
});

server.listen(port, 'localhost', () => {
  console.log(`Server listening on port ${port}..`);
});
