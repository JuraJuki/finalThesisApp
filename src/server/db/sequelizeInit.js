const Sequelize = require("sequelize");
const Config = require("../config/index");

const instance = new Sequelize(Config.database, Config.user, Config.password, {
    host: Config.host,
    dialect: "mysql"
});

const initdb = async () => {
    try {
        await instance.authenticate();
        console.log("CONNECTED");
    } catch (err) {
        console.log("error authenthicate");
    }
    return instance;
}


module.exports = instance;