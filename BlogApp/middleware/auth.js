const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { JWT_SECRET } = require('../appConstants');

const requireAuth = (req, res, next) => {
  const token = req.cookies.user_jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log({ decodedToken });
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.user_jwt;

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const { id } = decodedToken;
        let user = await User.findById(id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
