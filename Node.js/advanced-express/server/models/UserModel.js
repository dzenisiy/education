const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    lowercase: true,
    validate: {
      validator: emailValidator.validate,
      message: props => `${props.value} is not a valid emails `,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    index: { unique: true },
    minLength: 8,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
