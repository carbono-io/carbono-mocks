'use strict';

var path = require('path');

var express = require('express');

var app = express();

// app.get('/ola', function (req, res) {
//     res.json({
//         ola: 'mundo'
//     });
// });

app.get('/', function (req, res) {
    res.json({
        moduleName: 'code-machine',
    });
});


var marked = express();

var other = express.static(path.join(__dirname, 'resources/other'));

marked.get('**/*.html', function (req, res) {

    var absolutePath = path.join(__dirname, 'resources/marked-html', req.path);
    res.sendFile(absolutePath);
});
marked.use('/', other)

var clean = express();
clean.get('**/*.html', function (req, res) {

    var absolutePath = path.join(__dirname, 'resources/clean-html', req.path);
    res.sendFile(absolutePath);
});
clean.use('/', other)


// Serve marked html resources
app.use('/resources/marked', marked);
app.use('/resources/clean', clean);

module.exports = app;


