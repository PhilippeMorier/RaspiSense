'use strict';

function AirPressureSensorMock() {
    this._isInitialized = false;
}

AirPressureSensorMock.prototype.initialize = function () {
    this._isInitialized = true;
};

AirPressureSensorMock.prototype.isInitialized = function () {
    return this._isInitialized;
};

AirPressureSensorMock.prototype.read = function (callback) {
    callback({
        pressure: 1000 + (20 * Math.sin(Date.now())),
        temperature: 20 + (10 * Math.sin(Date.now() + 10))
    });
};

module.exports = new AirPressureSensorMock();
