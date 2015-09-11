'use strict';
var CJM = require('carbono-json-messages');

function createRoutes(io) {
    console.log('yyyy');

    io.on('connection', function (socket) {
        console.log('has a client');
        var profile = new CJM({id: 'x1', apiVersion: '1.0.0'});
        profile.setData(
            {
                id: 'y2',
                items: [
                    {
                       component: 'crud-basic',
                       route: 'crud007'
                    }
                ]
            }
        );

        socket.on('installComponent',
            function (data) {
                console.log('installComponent', data);
                socket.emit('installMachine', profile.toObject());
            }
        );
    });
}

module.exports.createRoutes = createRoutes;
