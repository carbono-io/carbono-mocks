'use strict';

var express = require('express');

var dcm = express();

//receives {projectId: <value>, machineAlias: <value>}
dcm.post('/container/', function(req, res) {
    if (!req.body || !req.body.projectId) {
        res.status(400).end();
    } else {
        res.json({
            containerId: '1234',
            url: 'http://localhost:3000/code-machine',
        });
        res.end();
    }
});

module.exports = dcm;