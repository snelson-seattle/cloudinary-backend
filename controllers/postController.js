require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { Post } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  secure: true,
});

const createPost = async (req, res) => {
  // Get the path for the uploaded image that is provided by the multer middleware
  const imagePath = req.file.path;

  try {
    // upload the image to cloudinary
    const image = await cloudinary.uploader.upload(imagePath); 

    // create the post on my database
    await Post.create({
      title: req.body.title,
      text: req.body.description,
      imgUrl: image.secure_url,
    });

    // Delete the uploaded image from our server
    fs.unlinkSync(imagePath, (err) => {
      if (err) {
        throw err;
      }
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createPost,
};
