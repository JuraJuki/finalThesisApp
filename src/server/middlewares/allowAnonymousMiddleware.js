const permitAuth = require("permit");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

const permit = new permitAuth.Bearer({});

const middleware = async (req, res, next) => {
  const token = permit.check(req);

  if (!token) {
    return next();
  } else {
    const decoded = jwt.verify(token, config.jwtKey);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  return next("error decoding token");
};

module.exports = middleware;
