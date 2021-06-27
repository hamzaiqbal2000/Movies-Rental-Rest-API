//Restful API for creating, getting, updating, and deleting genres of movies

//create a server
//const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const router = express.Router();

//get all the genres
router.get("/", async (req, res) => {
  //   const sortBy = req.query.sortBy;
  throw new Error("Could not get the genres");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//get the specfic genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send("The genre you have searched for is not available");
  }
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  //validating the new genre
  const { error } = validate(req.body); //destructuring

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //creating a new genre
  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //look up for the genre
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  // if not available error
  if (!genre) {
    return res
      .status(404)
      .send("The genre you are trying to find is not available");
  }

  //if not updated send error message = validate
  //update the genre
  //return the genre
  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  // look for the genre
  const genre = await Genre.findByIdAndRemove(req.params.id);
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  //if not available show error
  if (!genre) {
    return res
      .status(404)
      .send("The course you are trying to delete is not available");
  }

  // if available delete
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  //return the deleted genre
  res.send(genre);
});

module.exports = router;
