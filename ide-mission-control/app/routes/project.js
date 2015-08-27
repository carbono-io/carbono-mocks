'use strict';

var express = require('express');
var resources = require('./resources');
var projectController = require('../controllers/project');

var app = express();

app.use('/:projectId/resources', resources);

app.get('/:projectId', projectController.list);

app.post('/', projectController.create);

module.exports = app;
