const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");

const SingleImage = connection.define("singleImage", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    path:{
        type: Sequelize.TEXT,
        allowNull:false,
    },
    views:{
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    name:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt:{
        type: Sequelize.TIME,
        allowNull: false,
        defaultValue: new Date(),
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    favorites: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        timestamps: false,
    });

module.exports = SingleImage;