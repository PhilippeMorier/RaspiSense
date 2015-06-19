'use strict';

var async = require('async');

var MeasurementService = function (measurementRepository, airPressureSensorService, humiditySensorService, lightSensorService, cameraSensorService) {
    this._airPressureSensorService = airPressureSensorService;
    this._humiditySensorService = humiditySensorService;
    this._lightSensorService = lightSensorService;
    this._measurementRepository = measurementRepository;
    this._cameraSensorService = cameraSensorService;
};

MeasurementService.prototype.takeMeasurement = function (callback) {
    var self = this;

    async.parallel({
            lightSensorValue: function (lightSensorResultCallback) {
                self._lightSensorService.readSensorValue(function (lightValue) {
                    lightSensorResultCallback(null, [lightValue]);
                });
            },
            humiditySensorValues: function (humiditySensorResultCallback) {
                self._humiditySensorService.readSensorValues(function (humidityAndTemperatureValue) {
                    humiditySensorResultCallback(null, humidityAndTemperatureValue);
                });
            },
            airPressureSensorValues: function (airPressureSensorResultCallback) {
                self._airPressureSensorService.readSensorValues(function (airPressureAndTemperatureValue) {
                    airPressureSensorResultCallback(null, airPressureAndTemperatureValue);
                });
            }/*,
            cameraSensorValue: function (cameraSensorResultCallback) {
                self._cameraSensorService.readSensorValue('photo_' + Date.now() + '.jpg', function (cameraPhotoPath, error) {
                    cameraSensorResultCallback(error, cameraPhotoPath);
                });
            }*/
        },
        function (error, sensorValues) {
            if (!error) {
                var allSensorValues = sensorValues.lightSensorValue
                    .concat(sensorValues.humiditySensorValues)
                    .concat(sensorValues.airPressureSensorValues);

                callback(allSensorValues, sensorValues.cameraSensorValue);
            }
        }
    );
};

module.exports = MeasurementService;
