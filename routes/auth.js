'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.send('login route accessible');
});

router.delete('/', (req, res, next) => {
  res.send('logout route accessible');

});

module.exports = router;
