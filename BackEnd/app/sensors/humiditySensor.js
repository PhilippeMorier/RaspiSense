'use strict';

var Dht22 = require('node-dht-sensor');

function HumiditySensor() {
    this._isInitialized = false;
}

HumiditySensor.prototype.initialize = function () {
    this._dht22 = Dht22;
    this._isInitialized = this._dht22.initialize(22, 14); // type, pin
};

HumiditySensor.prototype.isInitialized = function () {
    return this._isInitialized;
};

HumiditySensor.prototype.read = function (callback) {
    var value = this._dht22.read();

    callback({
        humidity: value.humidity.toFixed(1),
        temperature: value.temperature.toFixed(1)
    });
};

module.exports = new HumiditySensor();
