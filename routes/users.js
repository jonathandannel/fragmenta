const User = require('../models').User;
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;
  User.checkIfExists({ username, email }).then(found => {
    if (!found) {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (hash && !err) {
          User.createNew({ username, email, password: hash });
          res
            .status(200)
            .json({
              message: 'User created successfully',
              success: true,
            })
            .end();
        }
      });
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

module.exports = router;
