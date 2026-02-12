const Joi = require("joi");

const jobSchema = Joi.object({
  title: Joi.string().min(3).required(),

  description: Joi.string().min(10).required(),

  requiredSkills: Joi.alternatives().try(
    Joi.string().min(1),
    Joi.array().items(Joi.string().min(1))
  ).required(),

  experienceLevel: Joi.string().required(),

  jobType: Joi.string().valid("Internship", "Full-time", "Part-time").required(),

  location: Joi.string().min(2).required(),
});

module.exports = jobSchema;
