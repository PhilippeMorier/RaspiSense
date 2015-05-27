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
        humidity: 71,
        temperature: 21
    });
};

module.exports = new HumiditySensorMock();
