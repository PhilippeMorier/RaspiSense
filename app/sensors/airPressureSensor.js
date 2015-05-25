'use strict';

var BMP085 = require('bmp085');

function AirPressureSensor() {
    this._isInitialized = false;
}

AirPressureSensor.prototype.initialize = function () {
    this._bmp085 = new BMP085();
    this._isInitialized = true;
};

AirPressureSensor.prototype.isInitialized = function () {
    return this._isInitialized;
};

AirPressureSensor.prototype.read = function (callback) {
    this._bmp085.read(function (data) {
        callback({
            pressure: data.pressure,
            temperature: data.temperature
        });
    });
};

module.exports = new AirPressureSensor();
