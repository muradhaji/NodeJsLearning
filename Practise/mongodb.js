const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require('lodash');

const PORT = 3000;

const app = express();

const dbUserName = 'muradhajiyev42';
const dbUserPassword = 'user4242';
const dbClusterName = 'node-learning';
const URI = `mongodb+srv://${dbUserName}:${dbUserPassword}@nodelearning.rnzl70f.mongodb.net/${dbClusterName}?retryWrites=true&w=majority`;

// Mongo DB Connection Started

mongoose
  .connect(URI)
  .then((result) => {
    console.log('Connected to DB..');
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// Mongo DB Connection Started

// View Engine Configuring
app.set('view engine', 'ejs');

// Changes default views folder path
// app.set('views', 'myViewsFolder');

// Middleware Started

// Custom Middleware
// app.use((req, res, next) => {
//   console.log(`New request made:`);
//   next();
// });

// Serving the static files
app.use(express.static('public'));

// Accepting form data
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use(morgan('dev'));

// Middleware End

// Blogs Started

app.get('/blogs/new', (req, res) => {
  res.render('newBlog', { path: req.path });
});

app.get('/blogs/edit/:blogId', (req, res) => {
  const { blogId } = req.params;
  Blog.findById(blogId)
    .then((result) => {
      res.render('editBlog', {
        path: req.path,
        blog: result,
        pageTitle: 'Edit Blog',
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('blogs', { path: req.path, blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:blogId', (req, res) => {
  const { blogId } = req.params;

  Blog.findById(blogId)
    .then((result) => {
      res.render('detailedBlog', {
        path: req.path,
        blog: result,
        pageTitle: 'Blog Details',
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const { body: blogData } = req;
  const newBlog = new Blog(blogData);

  newBlog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:blogId', (req, res) => {
  const { blogId } = req.params;

  Blog.findByIdAndDelete(blogId)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put('/blogs/:blogId', (req, res) => {
  const { body, params } = req;
  const { blogId } = params;

  Blog.findByIdAndUpdate(blogId, body)
    .then((result) => {
      res.json({
        redirect: `/blogs/${blogId}`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Blogs End

// Home Started

app.get('/', (req, res) => {
  res.render('index', { path: req.path });
});

app.get('/home', (req, res) => {
  res.redirect('/');
});

// Home End

// About Started

app.get('/about', (req, res) => {
  res.render('about', { path: req.path });
});

// About End

// 404 Started

app.use((req, res) => {
  res.render('404', { path: req.path, pageTitle: '404 Page' });
});

// 404 End
