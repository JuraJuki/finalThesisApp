const jwt = require("jsonwebtoken");
const config = require("../config/index");

const create = user => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    config.jwtKey
  );
};

module.exports = { create };
