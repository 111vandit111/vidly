const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("../middlewaare/auth");
const {
  Users,
  validate
} = require("../modules/User");

router.get("/me", auth, async (req, res) => {
  console.log(req.user._id);
  const user = await Users.findById(req.user._id).select("-Password");
  res.send(user);
});
router.post("/", async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({
    Email: req.body.Email,
  });
  if (user) return res.status(400).send("User already registered.");

  user = new Users(_.pick(req.body, ["name", "Email", "Password","isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(user.Password, salt);
  user = await user.save();
  const token = user.generateAuthentication();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "Email"]));
});

module.exports = router;
// "name": "Vandit kala",
// "Email": "kala1@gmail.com",
// "Password": "kalala300001"