const candidateSchema = require("../models/candidateSchema");

const validateCandidate = (req, res, next) => {
  const { error } = candidateSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map(err => err.message);
    return res.status(400).json({
      success: false,
      errors: errorMessages
    });
  }

  next();
};

module.exports = validateCandidate;