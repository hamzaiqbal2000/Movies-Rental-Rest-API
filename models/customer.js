const Joi = require("joi");
const mongoose = require("mongoose");

//schema
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    reuqired: true,
    minlength: 8,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 11,
  },
});
//model== class

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(8).max(50).required(),
    phone: Joi.string().min(8).max(11).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.validate = validateCustomer;
