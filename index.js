var mongoose = require('mongoose');
var LightSensorService = require('./services/lightSensorService');
var MeasurementRepository = require('./repositories/measurementRepository');
var isWindowsPlatform = /^win/.test(process.platform);
var LightSensor = isWindowsPlatform ? require('./sensors/lightSensorMock') : require('./sensors/lightSensor');

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