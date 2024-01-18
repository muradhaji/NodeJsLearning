const express = require('express');

const PORT = 3000;

const app = express();

app.listen(PORT);

// Multi path matching
app.get(['/', '/home'], (req, res) => {
  // res.send('<h1>Home Page</h1>');
  res.sendFile('./otherFiles/home.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>');
  res.sendFile('./otherFiles/about.html', { root: __dirname });
});

// Redirect
app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile('./otherFiles/404.html', { root: __dirname });
});
