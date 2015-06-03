'use strict';

var restify = require('restify');
var string = require('../extensions/stringExtension');

var RoutingService = function (measurementService, measurementRepository) {
    this._measurementService = measurementService;
    this._measurementRepository = measurementRepository;

    if (!this._measurementService || !this._measurementRepository) {
        throw 'A measurement service and repository has to be provided.';
    }

    this._server = restify.createServer({
        name: 'RaspiSense',
        version: '0.0.1'
    });
};

RoutingService.prototype.initialize = function () {
    var self = this;

    self._server.use(restify.acceptParser(this._server.acceptable));
    self._server.use(restify.CORS());
    self._server.use(restify.queryParser());
    self._server.use(restify.bodyParser());

    self._server.pre(function (request, response, next) {
        console.log(string.format('{0} {1} {2} HTTP/{3}', getRequestIp(request), request.method, request.url, request.httpVersion));
        return next();
    });

    self._server.get('/measurements', function (request, response, next) {
        self._measurementRepository.getAllMeasurements(function (error, measurements) {
            response.send(measurements);
        });

        return next();
    });

    self._server.get('/measurements/:id', function (request, response, next) {
        self._measurementRepository.getMeasurementFromId(request.params.id, function (error, measurement) {
            response.send(measurement);
        });

        return next();
    });

    self._server.post('/measurements', function (request, response, next) {
        self._measurementService.takeMeasurement(function (sensorValues) {
            self._measurementRepository.saveMeasurement(sensorValues);
            response.send('Measurement was taken!');
        });

        return next();
    });

    self._server.put('/measurements/:id', function (request, response, next) {
        var measurement = request.params;
        self._measurementRepository.updateMeasurement(measurement.id, measurement.comment, function (error, numberAffected, rawResponse, measurement) {
            response.send(measurement);
        });

        return next();
    });

    self._server.del('/measurements/:id', function (request, response, next) {
        self._measurementRepository.deleteMeasurementFromId(request.params.id, function (error) {
            if (error) {
                throw error;
            }
            response.send('Measurement deleted!');
        });

        return next();
    });
};

RoutingService.prototype.startListen = function () {
    var server = this._server;
    server.listen(8080, function () {
        console.log('%s listening at %s', server.name, 8080);
    });
};

function getRequestIp(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    return ip;
}

module.exports = RoutingService;
