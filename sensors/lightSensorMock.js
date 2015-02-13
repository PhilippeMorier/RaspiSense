function LightSensor() {
}

LightSensor.prototype.initialize = function () {
    return true;
};

LightSensor.prototype.read = function (callback) {
    callback(42);
};

module.exports = LightSensor;