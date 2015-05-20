'use strict';

function LightSensorMock() {
}

LightSensorMock.prototype.initialize = function () {

};

LightSensorMock.prototype.isInitialized = function () {
    return true;
};

LightSensorMock.prototype.read = function (callback) {
    callback(122);
};

module.exports = new LightSensorMock();
