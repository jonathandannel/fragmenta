const User = require("../../models").User;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");

const router = express.Router();

router.post("/register", (req, res, next) => {
  const { username, email, password } = req.body;
  User.alreadyExists({ username, email }).then(found => {
    if (!found) {
      User.createNew({ username, email, password });
      res
        .status(200)
        .json({
          message: "User created successfully",
          success: true
        })
        .end();
    } else {
      res
        .status(500)
        .json({
          message: "Username or email already exists",
          success: false
        })
        .end();
    }
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username
    }
  }).then(user => {
    if (user) {
      const hash = user.dataValues.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (err || !result) {
          res
            .status(500)
            .json({
              message: "Incorrect password",
              success: false
            })
            .end();
        } else {
          const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "2d",
            issuer: "myriad"
          });
          res
            .status(200)
            .json({
              message: "User logged in successfully",
              success: true,
              token: `Bearer ${token}`,
              user: user.dataValues
            })
            .end();
        }
      });
    } else {
      res
        .status(500)
        .json({
          message: "User does not exist",
          success: false
        })
        .end();
    }
  });
});

module.exports = router;
