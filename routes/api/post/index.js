const router = require("express").Router();
const { createPost } = require("../../../controllers/postController");
const multer = require("multer");

// Configure multer middleware to store uploaded images in the uploads folder on our server (these will be removed later)
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), createPost);

module.exports = router;
