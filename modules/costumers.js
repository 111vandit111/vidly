const mongoose = require("mongoose");
const Joi = require("joi");

const Costumer = mongoose.model(
  "costumers",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

function validatecostumers(Customer) {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().default(false),
  });

  return Schema.validate(Customer);
}

exports.Costumers = Costumer;
exports.validate = validatecostumers;
