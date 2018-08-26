const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");
const Image = require("./Image");

const User = connection.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    avatar: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = User;
