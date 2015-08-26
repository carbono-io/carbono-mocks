'use strict'
var path = require('path');
var fs = require('fs');
var CJR = require("carbono-json-response");

/*
* Mocks the request for a marked .html file from a project
* 
* @path GET /ide-mission-control/project/:projectId/marked/index.html
* 
* @param projectId Identifies a project.
*        (@location req.params.projectId) 
*        (@required yes) 
*        (@schema {"projectId": <string>})
* 
* @response 200 File was successfuly retrieved
*			returns a .html file
*           
*           400 Malformed request
*           (@schema {
*                      "code": 400,
*                      "message": "projectId cannot be null"
*                    })
*
*           404 File not found
*           (@schema {
*                      "code": 404,
*                      "message": "File not found"
*                    })
* 
* @usage Assuming that carbono-mocks is running at localhost:3000, you can test
*        this function with this curl command: 
*        curl -X POST  http://localhost:3000/ide-mission-control/project/
*		 u18923uhe12u90uy781gdu/marked/index.html --verbose
*/
exports.marked = function(req, res) {
    var absolutePath = 
    path.join(__dirname, '../../resources/marked-html', req.path);
    fs.exists(absolutePath, function (exists) {
        var cjr = new CJR("1.0");
        try {
            if ( !exists ) {
                res.status(404);
                var err = {
                       code: 404,
                       message: "File not found",
                   };
                cjr.setError(err);
                res.json(cjr);
                res.end();
            } else {
                res.sendFile(absolutePath);
            }
        } catch (e) {
            res.status(500).end();
        }
    });
    
};

/*
* Mocks the request for a clean .html file from a project
* 
* @path GET /ide-mission-control/project/:projectId/clean/index.html
* 
* @param projectId Identifies a project.
*        (@location req.params.projectId) 
*        (@required yes) 
*        (@schema {"projectId": <string>})
* 
* @response 200 File was successfuly retrieved
*			returns a .html file
*           
*           400 Malformed request
*           (@schema {
*                      "code": 400,
*                      "message": "projectId cannot be null"
*                    })
*
*           404 File not found
*           (@schema {
*                      "code": 404,
*                      "message": "File not found"
*                    })
* 
* @usage Assuming that carbono-mocks is running at localhost:3000, you can test
*        this function with this curl command: 
*        curl -X POST  http://localhost:3000/ide-mission-control/project/
*		 u18923uhe12u90uy781gdu/clean/index.html --verbose
*/
exports.clean = function(req, res) {
   var absolutePath = 
   path.join(__dirname, '../../resources/clean-html', req.path);
   fs.exists(absolutePath, function (exists) {
        var cjr = new CJR("1.0");
        try {
            if ( !exists ) {
                res.status(404);
                var err = {
                       code: 404,
                       message: "File not found",
                   };
                cjr.setError(err);
                res.json(cjr);
                res.end();
            } else {
                res.sendFile(absolutePath);
            }
        } catch (e) {
            res.status(500).end();
        }
    });
};

/*
* Mocks the request for a file that is not an .html file from a project
* 
* @path GET /ide-mission-control/project/:projectId/marked/index.js
* 
* @param projectId Identifies a project.
*        (@location req.params.projectId) 
*        (@required yes) 
*        (@schema {"projectId": <string>})
* 
* @response 200 File was successfuly retrieved
*			returns a .html file
*           
*           400 Malformed request
*           (@schema {
*                      "code": 400,
*                      "message": "projectId cannot be null"
*                    })
*
*           404 File not found
*           (@schema {
*                      "code": 404,
*                      "message": "File not found"
*                    })
* 
* @usage Assuming that carbono-mocks is running at localhost:3000, you can test
*        this function with this curl command: 
*        curl -X POST  http://localhost:3000/ide-mission-control/project/
*		 u18923uhe12u90uy781gdu/marked/index.js --verbose
*/
exports.other = function(req, res) {
    var absolutePath =
    path.join(__dirname, '../../resources/other', req.path);
    fs.exists(absolutePath, function (exists) {
        var cjr = new CJR("1.0");
        try {
            if ( !exists ) {
                res.status(404);
                var err = {
                       code: 404,
                       message: "File not found",
                   };
                cjr.setError(err);
                res.json(cjr);
                res.end();
            } else {
                res.sendFile(absolutePath);
            }
        } catch (e) {
            res.status(500).end();
        }
    });
};
