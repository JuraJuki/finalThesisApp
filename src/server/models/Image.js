const Sequelize = require("sequelize");
const connection = require("../db/sequelizeInit");

const Image = connection.define("image", {
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
    }
},
    {
        timestamps: false,
    });

module.exports = Image;