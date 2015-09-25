'use strict';

var express = require('express');
var resources = require('./resources');
var projectController = require('../controllers/project');

var app = express();

app.use('/:code/resources', resources);

app.post('/', projectController.create);

module.exports = app;
