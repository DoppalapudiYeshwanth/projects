const jobSchema = require("../validations/jobValidation");

const validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body.Job || req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map(err => err.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages
    });
  }

  next(); // Data is valid, move to controller
};

module.exports = validateJob;
