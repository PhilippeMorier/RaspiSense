'use strict';

function LightSensor() {
}

LightSensor.prototype.initialize = function () {

};

LightSensor.prototype.isInitialized = function () {
    return true;
};

LightSensor.prototype.read = function (callback) {
    callback(122);
};

module.exports = new LightSensor();
