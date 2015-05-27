'use strict';

function HumiditySensorService(humiditySensor) {
    if (!humiditySensor) {
        throw 'A humidity sensor has to be provided.';
    }
    this._humiditySensor = humiditySensor;
}

HumiditySensorService.prototype.readSensorValues = function (callback) {
    this._humiditySensor.read(function (data) {
        var sensorValues = [
            {
                typeLabel: 'Temperature',
                value: data.temperature,
                unit: '°C',
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
