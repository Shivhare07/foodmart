module.exports = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // proceed to controller
  }

  return res.status(403).send({
    success: false,
    message: "Access denied: Admins only"
  });
};