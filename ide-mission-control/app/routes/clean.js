'use strict'

var express = require('express');
var resourcesController = require('../controllers/resources');

var clean = express();

clean.get('**/*.html', resourcesController.clean);

clean.use('/', resourcesController.other);

module.exports = clean;
