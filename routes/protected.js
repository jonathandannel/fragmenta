const express = require('express');
const checkToken = require('../jwt').checkToken;

const router = express.Router();
router.use(checkToken)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ message: 'protected route'})
});

module.exports = router;
