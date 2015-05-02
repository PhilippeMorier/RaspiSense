'use strict';

var mongoose = require('mongoose');
var RoutingService = require('./app/services/routingService');
var LightSensorService = require('./app/services/lightSensorService');
var MeasurementRepository = require('./app/repositories/measurementRepository');
var isWindowsPlatform = /^win/.test(process.platform);
var LightSensor = isWindowsPlatform ? require('./app/sensors/lightSensorMock') : require('./app/sensors/lightSensor');

mongoose.connect('mongodb://localhost:8910/RaspiSenseDatabase', function (error) {
    if (error) {
        throw error;
    }
});

var lightSensor = new LightSensor();
lightSensor.initialize();

if (lightSensor.isInitialized()) {

    var lightSensorService = new LightSensorService(lightSensor);
    var measurementRepository = new MeasurementRepository();

    if (lightSensorService) {

        lightSensorService.readSensorValue(function (sensorValue) {
            console.log(sensorValue);
            //measurementRepository.saveMeasurement(sensorValue);
        });

        /*measurementRepository.getMeasurement('54f1d92a79568a3c0a5916bd', function (error, measurement) {
            // an empty query result is not actually an error
            console.log(measurement);
        });*/

        /*measurementRepository.getMeasurementInDateRange(new Date('2015/03/01 15:24:14'), Date.now(), function (error, measurements) {
            console.log(measurements);
        });*/

        measurementRepository.getAllMeasurements(function (error, measurements) {
            console.log(measurements);
        });
    }

    var routingService = new RoutingService(measurementRepository, lightSensorService);
    routingService.initialize();
    routingService.startListen();
}

//mongoose.connection.close();
