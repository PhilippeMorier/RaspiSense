'use strict';

var restify = require('restify');

var RoutingService = function () {

};

RoutingService.prototype.initialize = function (measurementService) {
    console.log('initialize()');
    var server = restify.createServer({
        name: 'RaspiSense',
        version: '0.0.0'
    });

    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.get('/measurements/:id', function (req, res, next) {
        res.send(req.params);
        return next();
    });

    server.post('/measurements', function (req, res, next) {
        res.send(req.params);
        measurementService.readSensorValue();
        return next();
    });

    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
};

module.exports = RoutingService;
