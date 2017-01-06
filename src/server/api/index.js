'use strict'

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  console.log('hit base api');
  res.sendStatus(200);
});

module.exports = router;
