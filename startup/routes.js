const express = require("express");
const genres = require("../routes/genres");
const costumers = require("../routes/costumers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/User");
const auth = require("../routes/auth");
const error = require("../middlewaare/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/rentals", rentals);
  app.use("/api/auth", auth);
  app.use("/api/genres", genres);
  app.use("/api/costumers", costumers);
  app.use("/api/movies", movies);
  app.use("/api/user", users);
  app.use(error);
};
