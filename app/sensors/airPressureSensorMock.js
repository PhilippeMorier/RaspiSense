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
        pressure: 1013,
        temperature: 20
    });
};

module.exports = new AirPressureSensorMock();
