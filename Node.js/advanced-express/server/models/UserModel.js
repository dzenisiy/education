const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const { UserModel } = require('../../test/helper');

const SALT_ROUNDS = 12;

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

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
