'use strict';

var SensorInterface = require('../sensors/sensorInterface');

function LightSensorService(lightSensor) {
    SensorInterface.ensureItGetsImplementedBy(lightSensor);
    this._lightSensor = lightSensor;
    this._lightSensor.initialize();
}

LightSensorService.prototype.readSensor = function (callback) {
    this._airPressureSensor.read(function (value) {
        var sensorValue = {
            typeLabel: 'Light',
            value: value,
            unit: 'Lux',
            sensorId: 1
        };

        callback(sensorValue);
    });
};

module.exports = LightSensorService;
