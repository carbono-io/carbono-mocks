'use strict';
var CJM = require('carbono-json-messages');

function createRoutes(io) {
    console.log('yyyy');

    io.of('mission-control').addListener('connection', function (socket) {
        console.log('has a client');

        socket.on('command:insertElementAtXPath', function (data) {
            console.log('insertElementAtXPath', data);
            var reply = new CJM({id: data.id, apiVersion: '1.0'});
            socket.emit('command:insertElementAtXPath/success',
                    reply.toObject());
        });

        socket.on('command:insertElement', function (data) {
            console.log('insertElement', data);
            var reply = new CJM({id: data.id, apiVersion: '1.0'});
            socket.emit('command:insertElement/success', reply.toObject());
        });
    });
}

module.exports.createRoutes = createRoutes;
