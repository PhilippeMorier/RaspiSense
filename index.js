'use strict';

var async = require('async');
var mongoose = require('mongoose');
var RoutingService = require('./app/services/routingService');
var LightSensorService = require('./app/services/lightSensorService');
var HumiditySensorService = require('./app/services/humiditySensorService');
var AirPressureSensorService = require('./app/services/airPressureSensorService');
var MeasurementRepository = require('./app/repositories/measurementRepository');
var isWindowsPlatform = /^win/.test(process.platform);

mongoose.connect('mongodb://localhost:8910/RaspiSenseDatabase', function (error) {
    if (error) {
        throw error;
    }
});

var humiditySensor = isWindowsPlatform ? require('./app/sensors/humiditySensorMock') : require('./app/sensors/humiditySensor');
humiditySensor.initialize();

var lightSensor = isWindowsPlatform ? require('./app/sensors/lightSensorMock') : require('./app/sensors/lightSensor');
lightSensor.initialize();

var airPressureSensor = isWindowsPlatform ? require('./app/sensors/airPressureSensorMock') : require('./app/sensors/airPressureSensor');
airPressureSensor.initialize();

if (humiditySensor.isInitialized() && lightSensor.isInitialized() && airPressureSensor.isInitialized()) {

    var measurementRepository = new MeasurementRepository();

    var lightSensorService = new LightSensorService(lightSensor);
    var humiditySensorService = new HumiditySensorService(humiditySensor);
    var airPressureSensorService = new AirPressureSensorService(airPressureSensor);

    async.parallel({
            lightSensorValue: function (callback) {
                lightSensorService.readSensorValue(function (lightValue) {
                    callback(null, [lightValue]);
                });
            },
            humiditySensorValues: function (callback) {
                humiditySensorService.readSensorValues(function (humidityAndTemperatureValue) {
                    callback(null, humidityAndTemperatureValue);
                });
            },
            airPressureSensorValues: function (callback) {
                airPressureSensorService.readSensorValues(function (airPressureAndTemperatureValue) {
                    callback(null, airPressureAndTemperatureValue);
                });
            }
        },
        function (error, sensorValues) {
            if (!error) {
                var allSensorValues = sensorValues.lightSensorValue
                    .concat(sensorValues.humiditySensorValues)
                    .concat(sensorValues.airPressureSensorValues);

                measurementRepository.saveMeasurement(allSensorValues);
            }
        }
    );

    if (lightSensorService) {

        /*measurementRepository.getMeasurement('54f1d92a79568a3c0a5916bd', function (error, measurement) {
         // an empty query result is not actually an error
         console.log(measurement);
         });*/

        /*measurementRepository.getMeasurementInDateRange(new Date('2015/03/01 15:24:14'), Date.now(), function (error, measurements) {
         console.log(measurements);
         });*/

        /*measurementRepository.getAllMeasurements(function (error, measurements) {
         console.log(measurements);
         });*/
    }

    var routingService = new RoutingService(measurementRepository, lightSensorService);
    routingService.initialize();
    routingService.startListen();
}

//mongoose.connection.close();
