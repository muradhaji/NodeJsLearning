const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      minLength: 6,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
