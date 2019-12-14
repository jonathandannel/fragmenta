const User = require('../models').User;
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;
  User.checkIfExists({ username, email }).then(found => {
    if (!found) {
      User.createNew({ username, email, password });
      res
        .status(200)
        .json({
          message: 'User created successfully',
          success: true,
        })
        .end();
    } else {
      res
        .status(500)
        .json({
          message: 'Username or email already exists',
          success: false,
        })
        .end();
    }
  });
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
});

module.exports = router;
