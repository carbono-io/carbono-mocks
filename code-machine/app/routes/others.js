'use strict';

module.exports = function (app) {
    var fileServer = app.controllers.others;

    app.use('/resources/clean', fileServer);
    app.use('/resources/marked', fileServer);
};
