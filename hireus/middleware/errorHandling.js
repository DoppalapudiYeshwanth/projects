module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  // If error has status (custom error), use it. Otherwise 500.
  const statusCode = err.status || 500;

  // If error has message, use it. Otherwise generic.
  const message = err.message || "Something went wrong";

  // If request is from browser (EJS pages)
  if (req.accepts("html")) {
    return res.status(statusCode).render("error.ejs", {
      statusCode,
      message
    });
  }

  // If request is from API (JSON)
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};
