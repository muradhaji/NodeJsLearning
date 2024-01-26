const { User } = require('../models');

const DUBLICATE_FIELD_MESSAGES = {
  email: 'The email address you entered has already been used!',
};

// Error handler
const getErrMessages = (err) => {
  let errMessages = {
    message: null,
    fieldMessages: [],
  };

  if (err.message.includes('user validation failed')) {
    for (const key in err.errors) {
      let { path: fieldName, message: fieldMessage } =
        err.errors[key].properties;

      let fieldJson = {};
      fieldJson[fieldName] = fieldMessage;

      errMessages.fieldMessages.push(fieldJson);
    }
  } else if (err.code === 11000) {
    for (const key in err.keyValue) {
      let fieldJson = {};
      fieldJson[key] = DUBLICATE_FIELD_MESSAGES[key];

      errMessages.fieldMessages.push(fieldJson);
    }
  } else {
    errMessages.message = 'Something went wrong!';
  }
  return errMessages;
};

const signup_get = (req, res) => {
  res.render('auth/signup');
};

const login_get = (req, res) => {
  res.render('auth/login');
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(getErrMessages(err));
  }
};

const login_post = (req, res) => {
  console.log(req.body);
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
