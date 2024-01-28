const { User } = require('../models');
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET,
  JWT_AGE,
  JWT_AGE_MS,
  DUBLICATE_FIELD_MESSAGES,
} = require('../appConstants');

// Error handler
const getCustomErrors = (err) => {
  let customErr = {
    message: null,
    fieldMessages: [],
  };

  if (err.message.includes('user validation failed')) {
    for (const key in err.errors) {
      let { path: fieldName, message: fieldMessage } =
        err.errors[key].properties;

      let fieldJson = {};
      fieldJson['name'] = key;
      fieldJson['message'] = fieldMessage;

      customErr.fieldMessages.push(fieldJson);
    }
  } else if (err.code === 11000) {
    for (const key in err.keyValue) {
      let fieldJson = {};
      fieldJson['name'] = key;
      fieldJson['message'] = DUBLICATE_FIELD_MESSAGES[key];

      customErr.fieldMessages.push(fieldJson);
    }
  } else if (err.message) {
    customErr.message = err.message;
  } else {
    customErr.message = 'Something went wrong!';
  }
  return customErr;
};

const createJWT = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_AGE,
  });
};

const signup_get = (req, res) => {
  res.render('auth/signup', { path: req.originalUrl });
};

const login_get = (req, res) => {
  if (res.locals.user) {
    res.redirect('/');
  } else {
    res.render('auth/login', { path: req.originalUrl });
  }
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const user_jwt = createJWT(user._id);
    res.cookie('user_jwt', user_jwt, { httpOnly: true, maxAge: JWT_AGE_MS });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json(getCustomErrors(err));
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const user_jwt = createJWT(user._id);
    res.cookie('user_jwt', user_jwt, { httpOnly: true, maxAge: JWT_AGE_MS });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json(getCustomErrors(err));
  }
};

const logout_get = (req, res) => {
  res.cookie('user_jwt', '', { maxAge: 1 });
  res.redirect('/login');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
