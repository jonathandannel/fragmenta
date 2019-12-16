const User = require("../../models").User;
const express = require("express");
const checkToken = require("../../util").checkToken;

const router = express.Router();
router.use(checkToken);

router.get("/", (req, res, next) => {
  const { username } = req.decoded;
  User.findOne({
    where: {
      username
    }
  }).then(({ dataValues }) => {
    res.status(200).send(dataValues);
  });
});

module.exports = router;
