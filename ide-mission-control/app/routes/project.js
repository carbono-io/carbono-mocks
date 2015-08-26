'use strict'

var express = require('express');
var resources = require('./resources');
var projectController = require('../controllers/project');

var project = express();

// create project
project.post('/', projectController.create);
    
// list project
project.get('/:projectId', projectController.list);

project.use('/:projectId/resources', resources);

module.exports = project;