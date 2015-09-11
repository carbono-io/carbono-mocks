'use strict';
var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000/code-machine');

socket.on('connect', function(){
    console.log('connect');
});

socket.on('project:createMachine', function (data) {
    console.log('I will perform project:createMachine', JSON.stringify(data));
    socket.disconnect();
});

socket.emit('command:insertElement');
