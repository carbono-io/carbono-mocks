'use strict';

var CJR = require("carbono-json-response");
var cjr = new CJR("1.0");


// curl -X POST localhost:3000/ide-development-container-manager/container/ 
//  -d '{"apiVersion":"1.0", "id":"23123-123123123-12312", "data":{"id": "1234", "items": [{"projectId": "1234"}]}}' 
// --verbose -H "Content-Type: application/json"

/**
 * Creates a new container
 */
module.exports.createContainer = function (req, res) {
    try {
        if (!req.body || !req.body.data.items[0].projectId || req.body.appVersion === '1.0') {
            res.status(400);
            var err = {
                    code: 400,
                    message: "projectId cannot be null",
                } ;
                console.log(typeof err)
                console.log(typeof err === 'object');
                console.log(err)
    
            cjr.setError(err
            );
        } else {
            cjr.setData(
                {
                    id: '1234', //container id
                    items: [
                        {
                            url: 'http://localhost:3000/code-machine',
                        }                        
                    ]
                }
            );
        }
        res.json(cjr);
        res.end();
    } catch (err) {
        res.status(500).end();
    }
}


 