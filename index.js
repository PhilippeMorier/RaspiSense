'use strict';

var async = require('async');
var mongoose = require('mongoose');
var RoutingService = require('./app/services/routingService');
var LightSensorService = require('./app/services/lightSensorService');
var HumiditySensorService = require('./app/services/humiditySensorService');
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

if (humiditySensor.isInitialized() && lightSensor.isInitialized()) {

    var lightSensorService = new LightSensorService(lightSensor);
    var humiditySensorService = new HumiditySensorService(humiditySensor);

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
            }
        },
        function (error, sensorValues) {
            if (!error) {
                console.log(sensorValues.lightSensorValue.concat(sensorValues.humiditySensorValues));
            }
        }
    );

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

        /*measurementRepository.getAllMeasurements(function (error, measurements) {
         console.log(measurements);
         });*/
    }

    var measurementRepository = new MeasurementRepository();
    var routingService = new RoutingService(measurementRepository, lightSensorService);
    routingService.initialize();
    routingService.startListen();
}

//mongoose.connection.close();
