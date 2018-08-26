const express = require("express");
const server = express();
const users = require("./routes/users");
const configureServer = require("./config/configureServer");
const accounts = require("./routes/accounts");
const images = require("./routes/images");
const path = require("path");

require("./db/sequelizeInit");

configureServer(server);

server.use("/api/users", users);
server.use("/api/accounts", accounts);
server.use("/api/images", images);
server.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "./public/index.html"), console.log);
});

server.use((err, req, res, next) => {
  return res.send({ message: err }).end();
});

server.listen(80, () => console.log("Server started!"));
