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
  transformation: [{ width: 640, height: 480, crop: "limit" }]
});

const parser = multer({ storage: storage });

const router = express.Router();
router.use(checkToken);

router.get("/:userid", (req, res) => {
  const { userid } = req.params;
  Image.getAllUploadsByUserId({ userid }).then(images => {
    if (!images) {
      res.status(500).json({
        success: false,
        message: "Images not fetched"
      });
    }
    res.status(200).json({
      images,
      message: "Images fetched successfully",
      success: true
    });
  });
});

router.get("/:userid/finished", (req, res) => {
  const { userid } = req.params;
  Image.getAllFinalPhotosByUserId({ userid }).then(images => {
    if (!images) {
      res.status(500).json({
        success: false,
        message: "Images not fetched"
      });
    }
    res.status(200).json({
      images,
      message: "Images fetched successfully",
      success: true
    });
  });
});

router.post("/upload", parser.single("image"), (req, res) => {
  if (req) {
    Image.createNew({
      url: req.file.url,
      userid: req.decoded.userid,
      final: req.body.final
    }).then(image => {
      return res.json({
        success: true,
        message: "Image uploaded successfully",
        path: req.file.url,
        image
      });
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Error uploading image"
    });
  }
});

module.exports = router;
