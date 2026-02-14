const Joi = require("joi");

const candidateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email is required",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "string.empty": "Phone number is required",
    }),

  skills: Joi.alternatives()
    .try(
      Joi.string().min(2),
      Joi.array().items(Joi.string().min(2))
    )
    .required()
    .messages({
      "any.required": "Skills are required",
    }),
});

module.exports = candidateSchema;