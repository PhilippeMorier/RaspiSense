'use strict';

function HumiditySensorMock() {
    this._isInitialized = false;
}

HumiditySensorMock.prototype.initialize = function () {
    this._isInitialized = true;
};

HumiditySensorMock.prototype.isInitialized = function () {
    return this._isInitialized;
};

HumiditySensorMock.prototype.read = function (callback) {
    callback({
        humidity: 70 + (20 * Math.sin(Date.now())),
        temperature: 20 + (10 * Math.sin(Date.now() + 10))
    });
};

module.exports = new HumiditySensorMock();
