'use strict';

var express = require('express');
var containerRoutes = require("./app/routes/container.js");

var app = express();

//receives {projectId: <value>, machineAlias: <value>}
app.use('/', containerRoutes);

module.exports = app;
