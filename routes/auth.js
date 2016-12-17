'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authorizedUser = {
  username: 'demo',
  password: 'password1',
  token: null
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

    authorizedUser.token = jwt.sign(authorizedUser, process.env.JWT_SECRET);

    res.status(200).json(authorizedUser);
  }

});


router.delete('/', (req, res, next) => {

  console.log(req.body);

  const { username, password, token } = req.body;

  if (!req.body.token) {
    return res.status(400).json({ err: 'bad request' });
  }

  authorizedUser.token = null;
  res.status(200).json(authorizedUser);

});

module.exports = router;
