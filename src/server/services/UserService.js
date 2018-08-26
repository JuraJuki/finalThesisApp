const User = require("../models/User");
const bcrypt = require("bcrypt");
const Image = require("../models/Image");
const UserImage = require("../models/UserImage");
const Op = require("sequelize").Op;
const fs = require("fs");
const path = require("path");

const getAll = async () => {
  const users = await User.findAll();
  return users.map(mapAsResponse);
};

const getById = async id => {
  const user = await User.findById(id);
  const userImages = await Image.findAll({
    where: {
      userId: id
    }
  });

  const mappedUserImagesIds = userImages.map(x => x.id);

  const likesAndFavorites = await UserImage.findAll({
    where: {
      [Op.or]: [
        { userId: id },
        {
          imageId: {
            [Op.in]: [
              mappedUserImagesIds.length > 0 ? mappedUserImagesIds : [0]
            ]
          }
        }
      ]
    }
  });
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    uploads: userImages.length,
    totalViews: userImages.length ? getTotalViewsCount(userImages) : 0,
    totalLikes: likesAndFavorites.filter(x => x.userId != id && x.like).length,
    totalFavorites: likesAndFavorites.filter(x => x.userId != id && x.favorite)
      .length
  };
};

const getTotalViewsCount = imagesArray => {
  return imagesArray.map(x => x.views).reduce((prev, current) => {
    return prev + current;
  });
};

const create = async (email, username, password) => {
  const user = new User();
  user.email = email;
  user.username = username;
  user.avatar = "";
  user.passwordHash = await bcrypt.hash(password, 10);
  await user.save();

  return mapAsResponse(user);
};

const updateAvatar = async (userId, name) => {
  const user = await User.findById(userId);
  user.avatar = `/${name}.jpg`;
  await user.save();
};

const mapAsResponse = user => ({
  id: user.id,
  email: user.email,
  username: user.username,
  avatar: user.avatar
});

const deleteAccount = async userId => {
  const userImages = await Image.findAll({
    where: {
      userId
    }
  });
  userImages.forEach(image => {
    try {
      fs.unlink(path.join(__dirname, `../public${image.path}`));
    } catch (error) {
      console.log(error);
    }
  });
  await User.destroy({
    where: {
      id: userId
    }
  });
};

module.exports = {
  getAll,
  create,
  mapAsResponse,
  getById,
  updateAvatar,
  deleteAccount
};
