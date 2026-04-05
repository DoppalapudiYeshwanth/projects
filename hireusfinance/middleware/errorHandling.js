module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);
  const statusCode = err.status || 500;

  const message = err.message || "Something went wrong";

  if (req.accepts("html")) {
    return res.status(statusCode).render("error.ejs", {
      statusCode,
      message
    });
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};
