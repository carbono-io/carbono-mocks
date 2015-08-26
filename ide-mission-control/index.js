'use strict';
// requires
var express = require('express');
var path = require('path');
// route module for project
var project = require(path.join(__dirname, '/app/routes/project'));

var app = express();

// /ide-mission-control
app.get('/', function(req, res){
   res.json({
       moduleName: 'ide-mission-control'
   });
});

// will delegate to project
app.use('/project', project);
module.exports = app;