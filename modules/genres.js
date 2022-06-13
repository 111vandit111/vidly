const Joi = require("joi");
const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", GenreSchema);

function validateGenre(Genre) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return Schema.validate(Genre);
}

exports.genreSchema = GenreSchema;
exports.Genres = Genre;
exports.validate = validateGenre;
