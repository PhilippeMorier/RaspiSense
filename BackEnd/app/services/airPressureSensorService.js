'use strict';

function AirPressureSensorService(airPressureSensor) {
    if(!airPressureSensor) {
        throw 'A air pressure sensor has to be provided.';
    }
    this._airPressureSensor = airPressureSensor;
}

AirPressureSensorService.prototype.readSensorValues = function (callback) {
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
