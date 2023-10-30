const express = require(`express`);

const app = express();
const port = 3000;

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});

// using relative path
// app.use(express.static(`public`));

// creating virtual path
app.use(`/static`, express.static(`public`));


app.listen(port, () => {
  console.log(`Server listening on port ${port}..`);
});
