'use strict';
// requires
var path = require('path');
var express = require('express');

var app = express();

app.get('/', function(req, res){
   res.json({
       moduleName: 'ide-mission-control'
   });
});


var other = express.static(path.join(__dirname, 'resources/other'));


var marked = express();
marked.get('**/*.html', function(req, res) {
    var absolutePath = path.join(__dirname, 'resources/marked-html');
    res.sendFile(absolutePath);
});
marked.use('/', other);


var clean = express();
clean.get('**/*.html', function(req, res) {
   var absolutePath = path.join(__dirname, 'resources/clean-html', req.path);
   res.sendFile(absolutePath);
});
clean.use('/', other);


var project = express();

project.post('/', function(req, res) {
    res.json({
       projectId: 'u18923uhe12u90uy781gdu',
    });
});

project.get('/:projectId', function(req, res) {
   
});

project.use('/:projectId/resources/marked', marked);

project.use('/:projectId/resources/clean', clean);


app.use('/project', project);
module.exports = app;
