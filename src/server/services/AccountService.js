const User = require("../models/User");
const bcrypt = require("bcrypt");
const UserService = require("./UserService");
const JwtService = require("./JwtService");

const login = async (email, password) => {
  const foundUser = await User.findOne({
    where: {
      email
    }
  });

  if (!foundUser) {
    console.log("nea ga");
    return;
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    foundUser.passwordHash
  );

  if (isPasswordMatched)
    return {
      token: JwtService.create(foundUser)
    };
  console.log("password nedela");
  return;
};

module.exports = {
  login
};
