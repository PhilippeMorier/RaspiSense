'use strict';

var SensorInterface = require('../sensors/sensorInterface');

function HumiditySensorService(humiditySensor) {
    SensorInterface.ensureItGetsImplementedBy(humiditySensor);
    this._humiditySensor = humiditySensor;
    this._humiditySensor.initialize();
}

HumiditySensorService.prototype.readSensor = function (callback) {
    this._humiditySensor.read(function (data) {
        var sensorValues = [
            {
                typeLabel: 'Temperature',
                value: data.temperature,
                unit: '\u00B0C',
                sensorId: 2
            },
            {
                typeLabel: 'Humidity',
                value: data.humidity,
                unit: '%',
                sensorId: 2
            }
        ];

        callback(sensorValues);
    });
};

module.exports = HumiditySensorService;
