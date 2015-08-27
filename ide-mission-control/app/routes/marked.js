'use strict';

var express = require('express');

var resourcesController = require('../controllers/resources');

var app = express();

app.get('**/*.html', resourcesController.marked);

app.use('/', resourcesController.other);

module.exports = app;
