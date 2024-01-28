const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
const { authRouter, blogRouter } = require('./routes');
const { requireAuth, checkUser } = require('./middleware/auth');
const {
  APP_PORT,
  DB_USER_NAME,
  DB_USER_PASS,
  DB_CLUSTER_NAME,
  URI,
} = require('./appConstants');

const app = express();

// Mongo DB Connection Started
mongoose
  .connect(URI)
  .then((result) => {
    console.log('Connected to DB..');
    app.listen(APP_PORT);
  })
  .catch((err) => {
    console.log(err);
  });
// Mongo DB Connection End

// App Configurations Started
// View Engine Configuring
app.set('view engine', 'ejs');

// Changes default views folder path
// app.set('views', 'myViewsFolder');
// App Configurations End

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

// Accepting json data
app.use(express.json());

// Logger middleware
app.use(morgan('dev'));

// Cookie Parser
app.use(cookieParser());
// Middleware End

app.get('*', checkUser);

// Home Started
app.get('/', requireAuth, (req, res) => {
  res.render('index', { path: req.originalUrl });
});

app.get('/home', (req, res) => {
  res.redirect('/');
});
// Home End

// About Started
app.get('/about', requireAuth, (req, res) => {
  res.render('about', { path: req.originalUrl });
});
// About End

// Auth Routes Started
app.use(authRouter);
// Auth Routes End

// Blog Routes Started
app.use('/blogs', blogRouter);
// Blog Routes End

// 404 Started
app.use((req, res) => {
  res.render('404', { path: req.originalUrl, pageTitle: '404 Page' });
});
// 404 End
