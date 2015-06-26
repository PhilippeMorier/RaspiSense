'use strict';

var path = require('path');
var SensorInterface = require('../sensors/sensorInterface');

function CameraSensorService(cameraSensor) {
    SensorInterface.ensureItGetsImplementedBy(cameraSensor);
    this._cameraSensor = cameraSensor;
    this._cameraSensor.initialize(path.join(__dirname, '/../../db/photos'));
}

CameraSensorService.prototype.readSensor = function (fileName, callback) {
    if (!this._cameraSensor.isInitialized()) {
        throw 'Camera sensor is not initialized!';
    }

    this._cameraSensor.read(fileName, callback);
};

module.exports = CameraSensorService;
