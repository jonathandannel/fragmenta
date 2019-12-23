const User = require("../../models").User;
const express = require("express");
const checkToken = require("../../jwt").checkToken;

const router = express.Router();
router.use(checkToken);

router.get("/", (req, res, next) => {
  const { username } = req.decoded;
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      return res.status(200).send(user.dataValues);
    }
    return res.status(500);
  });
});

module.exports = router;
