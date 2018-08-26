const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,"../public"));
  },
  filename: function(req, file, cb) {
    cb(null, req.body.name + ".jpg");
  }
});

const uploadMiddlware = multer({
  storage
});

module.exports = uploadMiddlware;
