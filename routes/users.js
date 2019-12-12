const User = require('../models').User;
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

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

module.exports = router;
