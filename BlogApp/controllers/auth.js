const signup_get = (req, res) => {
  res.render('auth/signup');
};

const login_get = (req, res) => {
  res.render('auth/login');
};

const signup_post = (req, res) => {
  console.log(req.body);
  res.send('Signup request made..');
};

const login_post = (req, res) => {
  console.log(req.body);
  res.send('Login request made..');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
