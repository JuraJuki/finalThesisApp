const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const configure = server => {
    server.use(bodyParser.json());
    server.use(express.static(path.join(__dirname,"../public")));
};

module.exports = configure;
