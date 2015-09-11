'use strict';
var io = require('socket.io-client');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function(){
    console.log('connect');
});

socket.on('installMachine', function (data) {
    console.log('installMachine', data);
    socket.disconnect();
});

socket.emit('installComponent');
