exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Not authenticated" });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};