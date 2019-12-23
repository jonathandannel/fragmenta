const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const checkToken = require("../../jwt").checkToken;

const Image = require("../../models").Image;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "myriad",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

const router = express.Router();
router.use(checkToken);

router.post("/upload", parser.single("image"), (req, res) => {
  console.log(req.file);
  const { url, public_id } = req.file;
  // Image.create(image) // save image information in database
  //   .then(newImage => res.json(newImage))
  //   .catch(err => console.log(err));
});

module.exports = router;
