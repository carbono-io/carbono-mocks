'use strict'

var express = require('express');

var resourcesController = require('../controllers/resources');

var marked = express();
// gets all .html
marked.get('**/*.html', resourcesController.marked);

// delegates to other route
marked.use('/', resourcesController.other);

module.exports = marked;