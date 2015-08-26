'use strict'

var express = require('express');

var resourcesController = require('../controllers/resources');

var marked = express();

marked.get('**/*.html', resourcesController.marked);

marked.use('/', resourcesController.other);

module.exports = marked;
