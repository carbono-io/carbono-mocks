'use strict';

module.exports = function () {
    var moduleId = function (req, res) {
        res.json({
            moduleName: 'code-machine',
        });
    };

    return moduleId;
};

