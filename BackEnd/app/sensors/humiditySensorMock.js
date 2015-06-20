'use strict';

function HumiditySensorMock() {
}

HumiditySensorMock.prototype.initialize = function () {

};

HumiditySensorMock.prototype.isInitialized = function () {
    return true;
};

HumiditySensorMock.prototype.read = function (callback) {
    callback({
        humidity: 70 + (20 * Math.sin(Date.now())),
        temperature: 20 + (10 * Math.sin(Date.now() + 10))
    });
};

module.exports = new HumiditySensorMock();
