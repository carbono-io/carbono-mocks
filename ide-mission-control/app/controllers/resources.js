'use strict'
var path = require('path');
var express = require('express');

// marked callback function
exports.marked = function(req, res) {
    var absolutePath = path.join(__dirname, '../../resources/marked-html', req.path);
    res.sendFile(absolutePath);
};

// clean callback function
exports.clean = function(req, res) {
   var absolutePath = path.join(__dirname, '../../resources/clean-html', req.path);
   res.sendFile(absolutePath);
};

// other callback function
exports.other = express.static(path.join(__dirname, '../../resources/other'));

