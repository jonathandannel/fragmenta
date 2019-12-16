const User = require("../models").User;
const express = require("express");
const checkToken = require("../util").checkToken;

const router = express.Router();
router.use(checkToken);

router.get("/", (req, res, next) => {
  const { username } = req.decoded;
  User.findOne({
    where: {
      username
    }
  }).then(({ dataValues }) => {
    console.log("about to send");
    console.log(dataValues);
    res.status(200).json({
      user: dataValues,
      message: "User retrieved"
    });
  });
});

module.exports = router;
