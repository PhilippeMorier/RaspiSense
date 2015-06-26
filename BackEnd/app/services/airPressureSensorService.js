'use strict';

var SensorInterface = require('../sensors/sensorInterface');

function AirPressureSensorService(airPressureSensor) {
    SensorInterface.ensureItGetsImplementedBy(airPressureSensor);
    this._airPressureSensor = airPressureSensor;
    this._airPressureSensor.initialize();
}

AirPressureSensorService.prototype.readSensor = function (callback) {
    if (!this._airPressureSensor.isInitialized()) {
        throw 'Air pressure sensor is not initialized!';
    }

    this._airPressureSensor.read(function (data) {
        var sensorValues = [
            {
                typeLabel: 'Temperature',
                value: data.temperature,
                unit: '\u00B0C',
                sensorId: 3
            },
            {
                typeLabel: 'Air Pressure',
                value: data.pressure,
                unit: 'hPa',
                sensorId: 3
            }
        ];

        callback(sensorValues);
    });
};

module.exports = AirPressureSensorService;
