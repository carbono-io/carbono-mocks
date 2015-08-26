'use strict'

var express = require('express');

var project = express();

project.post('/project', project.create);
    
// list project
project.get('/project/:projectId', project.list);

module.exports = function(app) {
    
    var project = app.controllers.project;

    // create project
    app.post('/project', project.create);
    
    // list project
    app.get('/project/:projectId', project.list);
    
    // app.use('/project/:projectId/resources/marked', resources.marked);

    // app.use('/project/:projectId/resources/clean', resources.clean);
    
    return this;
};