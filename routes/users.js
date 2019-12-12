const User = require('../models').User;
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;
});

module.exports = router;
