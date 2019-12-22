const express = require("express");
const path = require("path");

const router = express.Router();

const update = (req, res, next) => {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
};

router.use(update);

router.get("/", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "../public"), err => {
    if (err) res.status(500).send(err);
  });
});

module.exports = router;
