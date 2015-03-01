'use strict';

var mongoose = require('mongoose');
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
    var lightMeasurementRepository = new MeasurementRepository();

    if (lightSensorService) {

        lightSensorService.readSensorValue(function (sensorValue) {
            console.log(sensorValue);
            lightMeasurementRepository.saveMeasurement(sensorValue);
        });
    }
}

mongoose.connection.close();
