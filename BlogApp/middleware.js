const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');

// Changes default views folder path
// app.set('views', 'myViewsFolder');

app.listen(PORT);

// Custom Middleware
// app.use((req, res, next) => {
//   console.log(`New request made:`);
//   console.log(`Hostname: ${req.hostname}`);
//   console.log(`Path: ${req.path}`);
//   console.log(`Method: ${req.method}`);
//   console.log(`Query: ${JSON.stringify(req.query)}`);
//   next();
// });

// Serving the static files
app.use(express.static('public'));

// Logger middleware
app.use(morgan('dev'));

// Multi path matching
app.get(['/', '/home'], (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/blogs', (req, res) => {
  const blogs = [
    { title: 'Blog 1', content: 'Lorem ipsum dolor sit amet.' },
    { title: 'Blog 2', content: 'Quasi sint voluptatum nemo assumenda?' },
    { title: 'Blog 3', content: 'Incidunt architecto corporis ut. Ipsa.' },
  ];
  res.render('blogs', { pageTitle: 'Blogs', blogs });
});

// Redirect
app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

// 404 Page
app.use((req, res) => {
  res.render('404', { pageTitle: '404' });
});
