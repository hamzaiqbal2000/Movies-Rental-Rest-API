const auth = require("../middleware/auth");
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre..");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre..");
  //look up for the genre
  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  // if not available error
  if (!movie) {
    return res
      .status(404)
      .send("The movie you are trying to find is not available");
  }

  //if not updated send error message = validate

  //update the genre

  //return the genre
  res.send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  // look for the genre
  const movie = await Movie.findByIdAndRemove(req.params.id);
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  //if not available show error
  if (!movie) {
    return res
      .status(404)
      .send("The movie you are trying to delete is not available");
  }

  // if available delete
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  //return the deleted genre
  res.send(movie);
});

module.exports = router;
