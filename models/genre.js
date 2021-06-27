const Joi = require("joi");
const mongoose = require("mongoose");

//schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    reuqired: true,
    minlength: 5,
    maxlength: 50,
  },
});
//model== class

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
