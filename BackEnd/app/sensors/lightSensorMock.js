'use strict';

function LightSensorMock() {
}

LightSensorMock.prototype.initialize = function () {

};

LightSensorMock.prototype.isInitialized = function () {
    return true;
};

LightSensorMock.prototype.read = function (callback) {
    callback(100 + (20 * Math.sin(Date.now())));
};

module.exports = new LightSensorMock();
