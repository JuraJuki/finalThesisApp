const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");


const Tag = connection.define("tag", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        unique: true,
        type: Sequelize.TEXT,
        allowNull:false,
    },
},
    {
        timestamps: false,
    });

module.exports = Tag;