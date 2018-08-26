const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");

const UserImage = connection.define(
  "userimage",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    imageId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    like: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = UserImage;
