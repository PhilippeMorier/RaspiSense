'use strict';

var RaspiCam = require('raspicam');

function CameraSensor() {
    this._isInitialized = false;
    this._camera = [];
}

CameraSensor.prototype.initialize = function (onReadCallback) {
    var self = this;

    self._camera = new RaspiCam({
        mode: 'photo',
        encoding: 'jpg',
        output: __dirname + '/../../db/img/',
        timeout: 1000
    });

    self._camera.on('read', onReadCallback);
    self._isInitialized = true;
};

CameraSensor.prototype.isInitialized = function () {
    return this._isInitialized;
};

CameraSensor.prototype.read = function (filename) {
    this._processId = this._camera.start({
        filename: filename
    });
};

module.exports = new CameraSensor();
