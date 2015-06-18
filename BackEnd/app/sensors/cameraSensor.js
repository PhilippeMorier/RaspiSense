'use strict';

var CameraPi = require('camerapi');

function CameraSensor() {
    this._isInitialized = false;
    this._camera = [];
}

CameraSensor.prototype.initialize = function (folder) {
    var self = this;

    self._camera = new CameraPi();
    self._camera.folder = folder;
    self._isInitialized = true;
};

CameraSensor.prototype.isInitialized = function () {
    return this._isInitialized;
};

CameraSensor.prototype.read = function (filename, callback) {
    this._camera.timeout(1)
        .width(512)
        .height(384)
        .quality(75)
        .takePicture(filename, function(file, error) {
            callback(file, error);
        });
};

module.exports = new CameraSensor();
