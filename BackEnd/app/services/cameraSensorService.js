'use strict';

function CameraSensorService(cameraSensor) {
    if (!cameraSensor) {
        throw 'A camera sensor has to be provided.';
    }
    this._cameraSensor = cameraSensor;
    this._cameraSensor.initialize(function onReadHandler(error, filename) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Photo taken: ' + filename);
        }
        self._camera.stop(self._processId);
    });
}

CameraSensorService.prototype.readSensorValue = function () {
    console.log('readSensorValue');
    this._cameraSensor.read('photo.jpg');
};

module.exports = CameraSensorService;
