'use strict';
var CJM = require('carbono-json-messages');

function createRoutes(io) {
    console.log('yyyy');

    io.of('code-machine').addListener('connection',
        function (socket) {
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

            socket.on('command:insertElement',
                function (data) {
                    console.log('inserting element, I need a machine', data);
                    socket.emit('project:createMachine', profile.toObject());
                }
            );
        }
    );
}

module.exports.createRoutes = createRoutes;
