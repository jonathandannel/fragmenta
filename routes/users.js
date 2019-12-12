const User = require('../models').User;
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  const exists = await User.alreadyExists({ username, email });
  console.log(exists);
  // if (exists) {
  //   res.send('EXISTS');
  //   res.end();
  // } else {
  //   res.send('DOES NOT EXIST');
  //   res.end();
  // }
});

module.exports = router;
