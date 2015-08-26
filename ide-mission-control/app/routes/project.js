'use strict'

var express = require('express');
var resources = require('./resources');
var projectController = require('../controllers/project');

var project = express();

project.post('/', projectController.create);

project.get('/:projectId', projectController.list);

project.use('/:projectId/resources', resources);

module.exports = project;
