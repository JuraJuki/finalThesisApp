const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");

const ImageTags = connection.define(
  "imagetag",
  {
    imageId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tagId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  },
  {
    timestamps: false
  }
);

module.exports = ImageTags;
