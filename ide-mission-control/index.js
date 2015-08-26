'use strict';
var express = require('express');
var path = require('path');
var project = require(path.join(__dirname, '/app/routes/project'));

var app = express();

app.get('/', function (req, res) {
    res.json({
        moduleName: 'ide-mission-control',
    });
});

app.use('/project', project);
module.exports = app;
