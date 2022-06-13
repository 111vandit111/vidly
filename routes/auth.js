const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { Users } = require("../modules/User");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ Email: req.body.Email });
  if (!user) return res.status(400).send("invalid user or password");

  const validPassword = await bcrypt.compare(req.body.Password, user.Password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthentication();

  res.send(token);
});

function validate(user) {
  const Schema = Joi.object({
    Email: Joi.string().min(7).max(255).required().email(),
    Password: Joi.string().min(8).max(255).required(),
  });
  return Schema.validate(user);
}

module.exports = router;
