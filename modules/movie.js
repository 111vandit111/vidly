const mongoose = require("mongoose");
const joi = require("joi");
const { genreSchema } = require("../modules/genres");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number,
});

const Movie = mongoose.model("Movie", MovieSchema);

function validateMovie(Movie) {
  const Schema = joi.object({
    title: joi.string().min(3).max(30).required(true),
    genreid: joi.string().required(true),
    numberInStock: joi.number().min(0).max(255),
    dailyRentalRate: joi.number().min(0).max(1400),
  });
  return Schema.validate(Movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
