'use strict'
var CJR = require('carbono-json-response');
var uuid = require('node-uuid');

/*
* Mock for the creation of a new project that should communicate with CM and
* DCM and return the projectId
*
* @path POST /ide-mission-control/project
*
* @param None, the request only needs to have a body
*
* @response 200 Project was successfuly created
*           (@schema {
*                      "id": <string response_id>,
*                      "items": [{
*                          "projectId": <string project_id>
*                       }]
*                    })
*
*           400 Malformed request
*           (@schema {
*                      "code": 400,
*                      "message": "body cannot be null"
*                    })
*
* @usage Assuming that carbono-mocks is running at localhost:3000, you can test
*        this function with this curl command:
*        curl -X POST  http://localhost:3000/ide-mission-control/project/
*        --verbose -H "Content-Type: application/json"
*/
exports.create = function (req, res) {
    var cjr = new CJR('1.0');
    try {
        if (!req.body) {
            res.status(400);
            var err = {
                   code: 400,
                   message: 'body cannot be null',
               };
            cjr.setError(err);
        } else {
            cjr.setData(
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
        res.json(cjr);
        res.end();
    } catch (e) {
        res.status(500).end();
    }
};

/*
* Mock for listing projects
*
* @path GET /ide-mission-control/project/:projectId
*
* @param projectId Identifies a project.
*        (@location req.params.projectId)
*        (@required yes)
*        (@schema {"projectId": <string>})
*
* @response 200 Project was successfuly created
*           (@schema {
*                      "id": <string response_id>,
*                      "items": [{
*                          "projectId": <string project_id>
*                       }]
*                    })
*
*           400 Malformed request
*           (@schema {
*                      "code": 400,
*                      "message": "projectId cannot be null"
*                    })
*
* @usage Assuming that carbono-mocks is running at localhost:3000, you can test
*        this function with this curl command:
*        curl -X POST  http://localhost:3000/ide-mission-control/project/
*        u18923uhe12u90uy781gdu
*        --verbose -H "Content-Type: application/json"
*/
exports.list = function (req, res) {
    var cjr = new CJR('1.0');
    try {
        if (!req.params.projectId) {
            res.status(400);
            var err = {
                   code: 400,
                   message: 'projectId cannot be null',
               };
            cjr.setError(err);
        } else {
            cjr.setData(
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
        res.json(cjr);
        res.end();
    } catch (e) {
        res.status(500).end();
    }
};
