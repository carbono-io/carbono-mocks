'use strict';
var uuid = require('node-uuid');
var RequestHelper = require('../lib/RequestHelper');
var reqHelper = new RequestHelper();

function projectResponse(data) {
    if (data.code) {
        return {
            id: uuid.v4(),
            items: [
                {
                    project: {
                        code: data.code,
                        safeName: 'project-safe-name-3123',
                        name: data.name,
                        description: data.description,
                    },
                },
            ],
        };
    } else {
        return {
            id: uuid.v4(),
            items: [
                {
                    project: {
                        code: 'ksjhaskdh88-8sdufsd8f-d9asd9',
                        safeName: 'project-safe-name-3123',
                        name: data.name,
                        description: data.description,
                    },
                },
            ],
        };
    }
}

/**
* This function creates a new project
*
* @param {Object} req - Request object
* @param {Object} res - Response object (will carry a success or error
* carbono-json-message)
*/
exports.create = function (req, res) {
    if (reqHelper.checkMessageStructure(req) && req.headers.authorization) {
        var userData = req.body.data.items[0];
        userData.auth = req.headers.authorization;
        var missingProperties =
            reqHelper.checkRequiredData(
                userData, ['name', 'description', 'auth']);
        if (missingProperties.length) {
            var errMessage = '';
            missingProperties.forEach(function (prop) {
                errMessage += 'Malformed request: ' + prop +
                 ' is required.\n';
            });
            reqHelper.createResponse(res, 400, errMessage);
        } else {
            if (userData.auth === 'token201') {
                reqHelper.createResponse(res, 201, projectResponse({
                    name: userData.name,
                    description: userData.description,
                }));
            } else if (userData.auth === 'token400') {
                reqHelper.createResponse(res, 400,
                    'Malformed Request');
            } else if (userData.auth === 'token403') {
                reqHelper.createResponse(res, 403,
                    'Forbidden - Access Denied');
            } else {
                reqHelper.createResponse(res, 500,
                    'Internal Server Error');
            }
        }
    } else {
        reqHelper.createResponse(res, 400, 'Malformed request');
    }
};
