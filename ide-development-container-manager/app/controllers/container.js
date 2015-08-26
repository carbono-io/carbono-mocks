'use strict';

var CJR = require('carbono-json-response');
var cjr = new CJR('1.0');

/**
 * Mocks the creation of a container that will host a new Machine (in this
 * example, it returns Code Machine's mock).
 *
 * #path POST /ide-development-container-manager/container
 *
 * @param projectId Identifies a project, which will be associated to a
 *        container. If this association was already done, this identifier will
 *        be used to retrieve the correct image of the corresponding container.
 *        (#location body.data.items[0])
 *        (#required yes)
 *        (#schema {"projectId": <string>})
 *
 * #response 200 Container was successfully created / retrieved.
 *           (@schema {
 *                      "id": <string container_id>,
 *                      "items": [{
 *                          "url": <string machines_url>
 *                       }]
 *                    })
 *
 *           400 Malformed request
 *           (@schema {
 *                      "code": 400,
 *                      "message": "projectId cannot be null"
 *                    })
 *
 * #usage Assuming that carbono-mocks is running at localhost:3000, you can test
 *        this function with this curl command:
 *        curl -X POST
 *        localhost:3000/ide-development-container-manager/container/
 *        -d '{"apiVersion":"1.0", "id":"23123-123123123-12312",
 *        "data":{"id": "1234", "items": [{"projectId": "1234"}]}}' --verbose
 *        -H "Content-Type: application/json"
 */
module.exports.createContainer = function (req, res) {
    try {
        // TODO sanity check for request structure
        if (!req.body || !req.body.data.items[0].projectId ||
            req.body.appVersion === '1.0') {
            res.status(400);
            var err = {
                    code: 400,
                    message: 'projectId cannot be null',
                } ;

            cjr.setError(err);
        } else {
            cjr.setData(
                {
                    id: '1234', // Container id
                    items: [
                        {
                            url: 'http://localhost:3000/code-machine',
                        },
                    ],
                }
            );
        }
        res.json(cjr);
        res.end();
    } catch (err) {
        res.status(500).end();
    }
};
