'use strict';

function LightSensorMock() {
    this._isInitialized = false;
}

LightSensorMock.prototype.initialize = function () {
    this._isInitialized = true;
};

LightSensorMock.prototype.isInitialized = function () {
    return this._isInitialized;
};

LightSensorMock.prototype.read = function (callback) {
    callback(100 + (20 * Math.sin(Date.now())));
};

module.exports = new LightSensorMock();
