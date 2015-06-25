'use strict';

var mongoose = require('mongoose');
var LightSensorService = require('./app/services/lightSensorService');
var HumiditySensorService = require('./app/services/humiditySensorService');
var AirPressureSensorService = require('./app/services/airPressureSensorService');
var CameraService = require('./app/services/cameraSensorService');
var MeasurementRepository = require('./app/repositories/measurementRepository');
var MeasurementService = require('./app/services/measurementService');
var RoutingService = require('./app/services/routingService');
var SensorInterface = require('./app/sensors/sensorInterface');
var isWindowsPlatform = /^win/.test(process.platform);

var humiditySensor = isWindowsPlatform ? require('./app/sensors/humiditySensorMock') : require('./app/sensors/humiditySensor');
var lightSensor = isWindowsPlatform ? require('./app/sensors/lightSensorMock') : require('./app/sensors/lightSensor');
var airPressureSensor = isWindowsPlatform ? require('./app/sensors/airPressureSensorMock') : require('./app/sensors/airPressureSensor');
var cameraSensor = require('./app/sensors/cameraSensor');

mongoose.connect('mongodb://127.0.0.1:8910/RaspiSenseDatabase', function (error) {
    if (error) {
        throw error;
    }
});

var measurementRepository = new MeasurementRepository();
var lightSensorService = new LightSensorService(lightSensor);
var humiditySensorService = new HumiditySensorService(humiditySensor);
var airPressureSensorService = new AirPressureSensorService(airPressureSensor);
var cameraService = new CameraService(cameraSensor);

var measurementService = new MeasurementService(measurementRepository, airPressureSensorService, humiditySensorService, lightSensorService, cameraService);
var routingService = new RoutingService(measurementService, measurementRepository);

routingService.initialize();
routingService.startListen();

//mongoose.connection.close();
