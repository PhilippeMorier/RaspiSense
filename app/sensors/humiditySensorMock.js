'use strict';

function HumiditySensor() {
}

HumiditySensor.prototype.initialize = function () {

};

HumiditySensor.prototype.isInitialized = function () {
    return true;
};

HumiditySensor.prototype.read = function (callback) {
    callback({
        humidity: 71,
        temperature: 21
    });
};

module.exports = new HumiditySensor();
