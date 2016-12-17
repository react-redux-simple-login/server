'use strict';

const express = require('express');
const router = express.Router();

const authorizedUser = {
  username: 'demo',
  password: 'password1'
};

router.post('/', (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ err: 'bad request' });
  }

  if (username !== authorizedUser.username) {
    return res.status(401).json({ err: 'user not found'});
  }

  if (password !== authorizedUser.password) {
    return res.status(401).json({ err: 'password incorrect'});
  }

  if (username === authorizedUser.username && password === authorizedUser.password) {
    res.status(200).json({ message: 'Login successful' });
  }

  //TODO: provide authentication token

});



router.delete('/', (req, res, next) => {
  res.send('logout route accessible');

});

module.exports = router;
