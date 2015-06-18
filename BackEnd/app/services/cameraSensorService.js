'use strict';

function CameraSensorService(cameraSensor) {
    if (!cameraSensor) {
        throw 'A camera sensor has to be provided.';
    }
    this._cameraSensor = cameraSensor;
    this._cameraSensor.initialize(__dirname + '/../../db/photos');
}

CameraSensorService.prototype.readSensorValue = function (fileName, callback) {
    this._cameraSensor.read(fileName, callback);
};

module.exports = CameraSensorService;
