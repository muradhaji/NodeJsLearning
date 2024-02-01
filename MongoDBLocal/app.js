const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { APP_PORT, DB_URI } = require('./constants');

const app = express();

// MongoDB Connection Start
mongoose
  .connect(DB_URI)
  .then((result) => {
    console.log('Connected to MongoDB..');
    app.listen(APP_PORT, () => {
      console.log(`Store app listening on port ${APP_PORT}..`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
// MongoDB Connection End

// Middleware Start
app.use(morgan('dev'));
// Middleware End

// App Routes Start
app.get('*', (req, res) => {
  res.send('Welcome to Store!');
});
// App Routes End
