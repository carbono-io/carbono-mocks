'use strict'

// creates new project
exports.create = function(req, res) {
    res.json({
        req: 'create project',
        timestamp: Date.now(),
        projectId: 'u18923uhe12u90uy781gdu',
    });
};

// lists projects
exports.list = function(req, res) {
    res.json({
        req: 'list project',
        timestamp: Date.now(),
        projectId: req.params.projectId,
        
    });
};
