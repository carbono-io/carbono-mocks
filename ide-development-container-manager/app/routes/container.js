'use strict';
var express = require("express");
var app = express();

var controller = require("../controllers/container.js");

app.post('/container/', controller.createContainer);
    
module.exports = app;
