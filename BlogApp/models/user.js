const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email address!'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address!'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password!'],
    minLength: [8, 'A password must contain at least 8 characters!'],
  },
});

// After user created
// userSchema.post('save', (doc, next) => {
//   next();
// });

// Before user created
userSchema.pre('save', async function (next) {
  console.log('User will be created: ', this);

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
