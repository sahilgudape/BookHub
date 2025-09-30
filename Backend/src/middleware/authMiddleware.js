const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

exports.authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const users = await authModel.getUserById(decoded.id);

    if (!users || users.length === 0) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = users[0];
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
