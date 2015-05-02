'use strict';

var restify = require('restify');

var RoutingService = function (measurementRepository, lightSensorService) {
    this._measurementRepository = measurementRepository;
    this._lightSensorService = lightSensorService;

    if (!this._measurementRepository) {
        throw 'A measurement repository has to be provided.';
    }

    this._server = restify.createServer({
        name: 'RaspiSense',
        version: '0.0.0'
    });
};

RoutingService.prototype.initialize = function () {
    var self = this;

    this._server.use(restify.acceptParser(this._server.acceptable));
    this._server.use(restify.jsonp());
    this._server.use(restify.queryParser());
    this._server.use(restify.bodyParser());

    this._server.get('/measurements', function (request, response, next) {
        self._measurementRepository.getAllMeasurements(function (error, measurements) {
            response.send(measurements);
        });

        return next();
    });

    this._server.get('/measurements/:id', function (request, response, next) {
        self._measurementRepository.getMeasurement(request.params.id, function (error, measurement) {
            response.send(measurement);
        });

        return next();
    });

    this._server.post('/measurements', function (request, response, next) {
        self._lightSensorService.readSensorValue(function(sensorValue) {
            self._measurementRepository.saveMeasurement(sensorValue);
            response.send('Measurement was taken!');
        });

        return next();
    });
};

RoutingService.prototype.startListen = function () {
    var server = this._server;
    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
};

module.exports = RoutingService;
