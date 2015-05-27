'use strict';

var mongoose = require('mongoose');
var RoutingService = require('./app/services/routingService');
var LightSensorService = require('./app/services/lightSensorService');
var HumiditySensorService = require('./app/services/humiditySensorService');
var AirPressureSensorService = require('./app/services/airPressureSensorService');
var MeasurementRepository = require('./app/repositories/measurementRepository');
var MeasurementService = require('./app/services/measurementService');
var isWindowsPlatform = /^win/.test(process.platform);

mongoose.connect('mongodb://127.0.0.1:8910/RaspiSenseDatabase', function (error) {
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

    var measurementService = new MeasurementService(measurementRepository, airPressureSensorService, humiditySensorService, lightSensorService);
    var routingService = new RoutingService(measurementService, measurementRepository);

    routingService.initialize();
    routingService.startListen();
}

//mongoose.connection.close();
