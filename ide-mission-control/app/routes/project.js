'use strict'

var express = require('express');
var resources = require('./resources');
var projectController = require('../controllers/project');

var app = express();

app.post('/', projectController.create);

app.get('/:projectId', projectController.list);

app.use('/:projectId/resources', resources);

module.exports = app;
