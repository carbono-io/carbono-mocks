'use strict';

var CJR = require('carbono-json-response');
var cjr = new CJR({apiVersion: '1.0'});

/**
 * Mocks the creation of a container that will host a new Machine (in this
 * example, it returns Code Machine's mock).
 *
 * Assuming that carbono-mocks is running at localhost:3000, you can call this
 * function with this curl command:
 *     curl -X POST localhost:3000/ide-development-container-manager/container/
 *     -d '{"apiVersion":"1.0", "id":"23123-123123123-12312", "data":{"id":
 *     "1234", "items": [{"projectId": "1234"}]}}' --verbose -H "Content-Type:
 *     application/json"
 *
 * @param {Object} req - Express object representing a Request
 * @param {Object} res - Express object representing a Response
 *
 * @function createContainer
 */
module.exports.createContainer = function (req, res) {
    try {
        // TODO sanity check for request structure
        if (!req.body || !req.body.data.items[0].projectId ||
            !req.body.apiVersion === '1.0') {
            res.status(400);
            var err = {
                    code: 400,
                    message: 'projectId cannot be null',
                } ;

            cjr.setError(err);
            res.json(cjr);
            res.end();
        } else {
            var promiseFind = global.serviceManager.findService('cm');

            promiseFind
                .then(function (url) {
                    cjr.setData(
                        {
                            id: '1234', // Container id
                            items: [
                                {
                                    url: url,
                                },
                            ],
                        }
                    );
                    res.json(cjr);
                    res.end();

                }, function (err) {
                    res.status(400);
                    var errResponse = {
                            code: 400,
                            message: 'Error trying to find CM url.' + err,
                        } ;

                    cjr.setError(errResponse);
                    res.json(cjr);
                    res.end();
                });
        }
    } catch (err) {
        res.status(500).end();
    }
};
