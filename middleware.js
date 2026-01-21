const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "jwtPassword");
    req.user = decoded.user; 
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
