const express = require('express');
const morgan = require('morgan');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require('lodash');

const PORT = 3000;

const app = express();

const dbUserName = 'muradhajiyev42';
const dbUserPassword = 'user4242';
const dbClusterName = 'node-learning';
const URI = `mongodb+srv://${dbUserName}:${dbUserPassword}@nodelearning.rnzl70f.mongodb.net/${dbClusterName}?retryWrites=true&w=majority`;

mongoose
  .connect(URI)
  .then((result) => {
    console.log('Connected to DB..');
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');

// Changes default views folder path
// app.set('views', 'myViewsFolder');

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

app.get('/add-blog', (req, res) => {
  const newBlog = new Blog({
    title: faker.lorem.sentence({ min: 2, max: 5 }),
    snippet: faker.lorem.sentence({ min: 5, max: 10 }),
    body: faker.lorem.lines({ min: 3, max: 5 }),
  });

  newBlog
    .save()
    .then((result) => {
      res.render('addBlog', { path: req.path, blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.find()
    .select({ _id: 1 })
    .then((result) => {
      Blog.findById(result[_.random(0, result.length - 1)])
        .then((result) => {
          res.render('singleBlog', { path: req.path, blog: result });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.render('index', { path: req.path });
});

app.get('/about', (req, res) => {
  res.render('about', { path: req.path });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.render('blogs', { path: req.path, blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Redirect
app.get('/home', (req, res) => {
  res.redirect('/');
});

// 404 Page
app.use((req, res) => {
  res.render('404');
});
