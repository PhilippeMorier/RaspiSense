'use strict';

function AirPressureSensorMock() {
}

AirPressureSensorMock.prototype.initialize = function () {

};

AirPressureSensorMock.prototype.isInitialized = function () {
    return true;
};

AirPressureSensorMock.prototype.read = function (callback) {
    callback({
        pressure: 1000 + (20 * Math.sin(Date.now())),
        temperature: 20 + (10 * Math.sin(Date.now() + 10))
    });
};

module.exports = new AirPressureSensorMock();
