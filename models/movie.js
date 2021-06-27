const { genreSchema } = require("./genre");
const mongoose = require("mongoose");
const Joi = require("joi");

//schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255,
  },
});
//class//model
const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(0).max(50).required(),
  };
  return Joi.validate(movie, schema);
}

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.validate = validateMovie;
