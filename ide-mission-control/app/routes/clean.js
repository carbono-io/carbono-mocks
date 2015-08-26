'use strict'

var express = require('express');
var resourcesController = require('../controllers/resources');

var clean = express();
// gets all .html
clean.get('**/*.html', resourcesController.clean);

// delegates to other route
clean.use('/', resourcesController.other);

module.exports = clean;