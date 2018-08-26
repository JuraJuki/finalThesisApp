const Image = require("../models/Image");
const Op = require("sequelize").Op;
const UserImage = require("../models/UserImage");
const connection = require("../db/sequelizeInit");
const SingleImage = require("../models/SingleImage");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const Tag = require("../models/Tag");
const ImageTags = require("../models/ImageTags");

const save = async ({ tags, name, description, userId }) => {
  const image = new Image();
  image.path = `/${name}.jpg`;
  image.views = 0;
  image.likes = 0;
  image.name = name;
  image.description = description;
  image.userId = userId;
  await image.save();
  const splitedTags = tags.split(" ");
  for (const singleTag of splitedTags) {
    const tag = new Tag();
    tag.name = singleTag;
    try {
      await tag.save();
      const imageTag = new ImageTags();
      imageTag.imageId = image.id;
      imageTag.tagId = tag.id;
      await imageTag.save();
    } catch (err) {
      const existingTag = await Tag.findOne({
        where: {
          name: singleTag
        }
      });
      const imageTag = new ImageTags();
      imageTag.imageId = image.id;
      imageTag.tagId = existingTag.id;
      await imageTag.save();
    }
  }
};

const getAllForUser = async id => {
  const allImages = await Image.findAll({
    where: {
      userId: id
    }
  });
  return allImages;
};

const getNewestImages = async () => {
  const query = {
    order: [["createdAt", "DESC"]]
  };
  return await Image.findAll(query);
};

const getTopImages = async () => {
  const result = await connection.query(
    "Select Count(ui.imageId) as numberOfLikes, i.name, i.path, i.id from images i left join userimages ui on ui.imageId = i.id GROUP By i.id ORDER BY numberOfLikes DESC"
  );
  return result[0];
};

const normalSearch = async term => {
  const images = await connection.query(`
    select i.id, i.path, i.views, i.name, i.description, i.userId, i.createdAt from images i
	  left join imagetags it on i.id = it.imageId
    left join tags t on it.tagId = t.id
    where i.name = :term or t.name = :term
  `, {
    replacements: {
      term: [term]
    },
    model: SingleImage
  });
  return images;
};

const getImagesByViews = async () => {
  const query = {
    order: [["views", "DESC"]]
  };

  return await Image.findAll(query);
};

const getImagesByFavorites = async () => {
  const result = await connection.query(
    "select *, Count(nullif(ui.favorite = false, true)) as favorites from images i left join userimages ui on i.id = ui.imageId group by i.id order by favorites DESC",
    {
      model: SingleImage
    }
  );

  return result;
};

const randomImages = async () => {
  const allImages = await Image.findAll();
  return allImages.sort((a, b) => {
    const rand = Math.round(Math.random());

    return rand;
  });
};

const search = async (term, searchType) => {
  searchType = searchType || (!term ? "NEWEST" : "");
  switch (searchType.toUpperCase()) {
    case "NEWEST":
      return await getNewestImages();
    case "TOP":
      return await getTopImages();
    case "MOST VIEWS":
      return await getImagesByViews();
    case "MOST FAVORITES":
      return await getImagesByFavorites();
    case "RANDOM":
      return await randomImages();
    default:
      return await normalSearch(term);
  }
};

const updateViews = async imageId => {
  const image = await Image.findOne({
    where: {
      id: imageId
    }
  });
  if (!image) throw new Error("Something went wrong at updateVIews");

  image.views += 1;
  await image.save();
};

const like = async (userId, imageId) => {
  let existing = await UserImage.findOne({
    where: {
      userId,
      imageId
    }
  });

  if (existing) {
    if (existing.like) {
      existing.like = false;
    } else {
      existing.like = true;
    }
    await existing.save();
  } else {
    const userImage = new UserImage();
    userImage.userId = userId;
    userImage.imageId = imageId;
    userImage.like = true;
    await userImage.save();
  }
};

const favorite = async (userId, imageId) => {
  let existing = await UserImage.findOne({
    where: {
      userId,
      imageId
    }
  });

  if (existing) {
    if (existing.favorite) {
      existing.favorite = false;
    } else {
      existing.favorite = true;
    }
    await existing.save();
  } else {
    const userImage = new UserImage();
    userImage.userId = userId;
    userImage.imageId = imageId;
    userImage.favorite = true;
    await userImage.save();
  }
};

const getSingle = async (userId, imageId) => {
  const result = await connection.query(
    `select *, 
  Count(nullif(ui.like = false, true)) as likes,
  Count(nullif(ui.favorite = false, true)) as favorites, 
  COALESCE((select ui2.like from userimages ui2 where ui2.userid = :userId AND ui2.imageId = :imageId), 0) as isLiked, 
  COALESCE((select ui2.favorite from userimages ui2 where ui2.userid = :userId AND ui2.imageId = :imageId), 0) as isFavorite 
  from images i left join userimages ui on i.id = ui.imageId where i.id = :imageId group by i.id`,
    {
      replacements: {
        userId: [userId],
        imageId: [imageId]
      },
      model: SingleImage
    }
  );
  const user = await connection.query(
    "select u.id, u.username from images i left join users u on i.userId = u.id WHERE i.id = :imageId",
    {
      replacements: {
        imageId: [imageId]
      },
      model: User
    }
  );
  return {
    imageInfo: result[0],
    user: user[0]
  };
};

const deleteImage = async (userId, imageId) => {
  const image = await Image.findOne({
    where: {
      userId,
      id: imageId
    }
  });
  if (image) {
    await Promise.all([
      UserImage.destroy({
        where: {
          imageId
        }
      }),
      Image.destroy({
        where: {
          id: imageId
        }
      })
    ]);

    fs.unlink(path.join(__dirname, `../public${image.path}`));
  }
};

module.exports = {
  save,
  getAllForUser,
  search,
  updateViews,
  like,
  favorite,
  getSingle,
  deleteImage
};
