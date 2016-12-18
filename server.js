'use strict';

require('dotenv').load();

const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const auth = require('./routes/auth.js');
app.use('/auth', auth);

const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
