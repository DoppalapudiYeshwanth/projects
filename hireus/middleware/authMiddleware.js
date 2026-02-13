const jwt = require("jsonwebtoken");
const People = require("../models/peopleSchema");

/* Protect Routes */
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await People.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

/* Role Authorization */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};

module.exports = { protect, authorize };
