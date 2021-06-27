//Restful API for creating, getting, updating, and deleting Customers of movies

//create a server
const auth = require("../middleware/auth");
const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

//for validation

//get all the Customers
router.get("/", async (req, res) => {
  //   const sortBy = req.query.sortBy;
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  //validating the new Customer
  const { error } = validate(req.body); //destructuring

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //creating a new Customer
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //look up for the genre
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  // if not available error
  if (!customer) {
    return res
      .status(404)
      .send("The genre you are trying to find is not available");
  }

  //if not updated send error message = validate

  //update the genre

  //return the genre
  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  // look for the genre
  const customer = await Customer.findByIdAndRemove(req.params.id);
  //const genre = genres.find((c) => c.id == parseInt(req.params.id));
  //if not available show error
  if (!customer) {
    return res
      .status(404)
      .send("The customer you are trying to delete is not available");
  }

  // if available delete
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);

  //return the deleted genre
  res.send(customer);
});

module.exports = router;
