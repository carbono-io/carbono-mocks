'use strict';
// Native dependencies
var http = require('http');

// External dependencies
var express = require('express');

var app = express();

app.httpServer = http.createServer(app);

app.use('/code-machine', require('./code-machine'))

// consign()
//     .include('code-machine')
//     .include('routes')
//     .into(app);
    

app.use('/res', express.static('code-machine/marked'));

var server = app.httpServer.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Carbono-Mocks listening at http://%s:%s', host, port);
});