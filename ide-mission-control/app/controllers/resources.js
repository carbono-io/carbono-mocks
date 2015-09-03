'use strict';
var path = require('path');
var fs = require('fs');
var CJR = require('carbono-json-response');

/**
* The marked function retrieves a marked .html file from a project
*
* Assuming that carbono-mocks is running at localhost:3000, you can test
* this function with this curl command:
*     curl http://localhost:3000/ide-mission-control/project/
*     u18923uhe12u90uy781gdu/resources/marked/index.html --verbose
* @param {Object} req - Request object
* @param {string} req.params.projectId - The id of the current project
* @param {string} req.params.fileName - The name (with path) of the
* clean file
* @param {Object} res - Response object (will carry a file or error
* carbono-json-message)
*/
exports.marked = function (req, res) {
    var absolutePath =
    path.join(__dirname, '../../resources/marked-html', req.path);
    fs.exists(absolutePath, function (exists) {
        var cjr = new CJR({apiVersion: '1.0'});
        try {
            if (!exists) {
                res.status(404);
                var err = {
                       code: 404,
                       message: 'File not found',
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

/**
* The clean function retrieves a clean .html file from a project
*
* Assuming that carbono-mocks is running at localhost:3000, you can test
* this function with this curl command:
*     curl http://localhost:3000/ide-mission-control/project/
*	  u18923uhe12u90uy781gdu/resources/clean/index.html --verbose
* @param {Object} req - Request object
* @param {string} req.params.projectId - The id of the current project
* @param {string} req.params.fileName - The name (with path) of the
* required clean file
* @param {Object} res - Response object (will carry a file or error
* carbono-json-message)
*/
exports.clean = function (req, res) {
    var absolutePath =
    path.join(__dirname, '../../resources/clean-html', req.path);
    fs.exists(absolutePath, function (exists) {
        var cjr = new CJR({apiVersion: '1.0'});
        try {
            if (!exists) {
                res.status(404);
                var err = {
                       code: 404,
                       message: 'File not found',
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

/**
* The other function retrieves a file that is not .html
*
* Assuming that carbono-mocks is running at localhost:3000, you can test
* this function with this curl command:
*     curl -X POST  http://localhost:3000/ide-mission-control/project/
*     u18923uhe12u90uy781gdu/resources/marked/index.js --verbose
*/
exports.other = function (req, res) {
    var absolutePath =
    path.join(__dirname, '../../resources/other', req.path);
    fs.exists(absolutePath, function (exists) {
        var cjr = new CJR({apiVersion: '1.0'});
        try {
            if (!exists) {
                res.status(404);
                var err = {
                       code: 404,
                       message: 'File not found',
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
