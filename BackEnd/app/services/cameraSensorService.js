'use strict';

var SensorInterface = require('../sensors/sensorInterface');

function CameraSensorService(cameraSensor) {
    SensorInterface.ensureItGetsImplementedBy(cameraSensor);
    this._cameraSensor = cameraSensor;
    this._cameraSensor.initialize(__dirname + '/../../db/photos');
}

CameraSensorService.prototype.readSensor = function (fileName, callback) {
    this._cameraSensor.read(fileName, callback);
};

module.exports = CameraSensorService;
