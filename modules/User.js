const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 7,
    max: 255,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    min: 8,
    max: 1024,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthentication = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    name: Joi.string().min(7).max(255).required(),
    Email: Joi.string().min(7).max(255).required().email(),
    Password: Joi.string().min(8).max(255).required(),
    isAdmin: Joi.boolean().default(false),
  });
  return Schema.validate(user);
}

exports.validate = validateUser;
exports.Users = User;
