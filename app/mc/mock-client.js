'use strict';
var io = require('socket.io-client');
var CJM = require('carbono-json-messages');

var socket = io.connect('http://localhost:3000/mission-control');

socket.on('connect', function () {
    console.log('connect');
});

var cmd = new CJM({apiVersion: '1.0'});

socket.emit('command:insertElementAtXPath', cmd.toObject());
socket.emit('command:insertElement', cmd.toObject());
