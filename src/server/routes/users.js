const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const Auth = require("../middlewares/bearerTokenMiddleware");
const ImageService = require("../services/ImageService");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

router
  //getting all users
  .get("/", Auth, async (req, res) => {
    const users = await UserService.getById(req.user.id);
    return res.send(users).end();
  })
  .get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    const [userInfo, images] = await Promise.all([
      UserService.getById(userId),
      ImageService.getAllForUser(userId)
    ]);

    return res.send({ userInfo, images }).end();
  })
  //creating a user (register)
  .post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    const createUser = await UserService.create(email, username, password);
    return res.send(createUser).end();
  })
  .post("/avatar", Auth, uploadMiddleware.single("image"), async (req, res) => {
    const name = req.body.name;
    await UserService.updateAvatar(req.user.id, name);
    return res.send({}).end();
  })
  .delete("/", Auth, async (req, res) => {
    await UserService.deleteAccount(req.user.id);
    return res.send({}).end();
  });

module.exports = router;
