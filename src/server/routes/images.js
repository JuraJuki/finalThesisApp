const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const Auth = require("../middlewares/bearerTokenMiddleware");
const AllowAnonymousAuth = require("../middlewares/allowAnonymousMiddleware");
const ImageService = require("../services/ImageService");

router
  .get("/", Auth, async (req, res) => {
    const allImages = await ImageService.getAllForUser(req.user.id);
    return res.send(allImages).end();
  })
  .get("/single/:imgId", AllowAnonymousAuth, async (req, res) => {
    const image = await ImageService.getSingle(
      req.user ? req.user.id : 0,
      req.params.imgId
    );
    return res.send(image).end();
  })
  .post("/upload", Auth, uploadMiddleware.single("image"), async (req, res) => {
    await ImageService.save({
      name: req.body.name,
      description: req.body.description,
      userId: req.user.id,
      tags: req.body.tags
    });
    return res.send("image uploaded!").end();
  })
  .get("/search/:term?", async (req, res) => {
    let foundImages = await ImageService.search(
      req.params.term,
      req.query.type
    );
    return res.send(foundImages).end();
  })
  .put("/updateViews/:imgId", async (req, res) => {
    await ImageService.updateViews(req.params.imgId);
    return res.send({}).end();
  })
  .put("/like/:imgId", Auth, async (req, res) => {
    await ImageService.like(req.user.id, req.params.imgId);
    return res.send({}).end();
  })
  .put("/favorite/:imgId", Auth, async (req, res) => {
    await ImageService.favorite(req.user.id, req.params.imgId);
    return res.send({}).end();
  })
  .delete("/:imgId", Auth, async (req, res) => {
    await ImageService.deleteImage(req.user.id, req.params.imgId);
    return res.send({}).end();
  });

module.exports = router;
