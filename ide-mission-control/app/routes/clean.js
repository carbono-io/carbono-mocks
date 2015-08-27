'use strict';

var express = require('express');
var resourcesController = require('../controllers/resources');

var app = express();

app.get('**/*.html', resourcesController.clean);

app.use('/', resourcesController.other);

module.exports = app;
