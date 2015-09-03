'use strict';
var CJM = require('carbono-json-messages');
var uuid = require('node-uuid');

/**
* The create function communicates with DCM and CM to create a new project and
* returns the projectId
*
* Assuming that carbono-mocks is running at localhost:3000, you can test
* this function with this curl command:
*     curl -X POST http://localhost:3000/ide-mission-control/project/ --verbose
*/
exports.create = function (req, res) {
    var cjm = new CJM({apiVersion: '1.0'});
    try {
        if (!req.body) {
            res.status(400);
            var err = {
                   code: 400,
                   message: 'body cannot be null',
               };
            cjm.setError(err);
        } else {
            cjm.setData(
               {
                   id: uuid.v4(),
                   items: [
                       {
                           projectId: 'u18923uhe12u90uy781gdu',
                       },
                   ],
               }
            );
        }
        res.json(cjm);
        res.end();
    } catch (e) {
        res.status(500).end();
    }
};

/**
* The list function retrieves a project based on the projectId
*
* Assuming that carbono-mocks is running at localhost:3000, you can test
* this function with this curl command:
*     curl http://localhost:3000/ide-mission-control/project/
*     u18923uhe12u90uy781gdu --verbose
*/
exports.list = function (req, res) {
    var cjm = new CJM({apiVersion: '1.0'});
    try {
        if (!req.params.projectId) {
            res.status(400);
            var err = {
                   code: 400,
                   message: 'projectId cannot be null',
               };
            cjm.setError(err);
        } else {
            cjm.setData(
               {
                   id: uuid.v4(),
                   items: [
                       {
                           projectId: req.params.projectId,
                       },
                   ],
               }
            );
        }
        res.json(cjm);
        res.end();
    } catch (e) {
        res.status(500).end();
    }
};
