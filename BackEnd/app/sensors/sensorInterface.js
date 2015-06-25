'use strict';

var Interface = require('../interface');
var SensorInterface = new Interface('SensorInterface', ['initialize', 'isInitialized', 'read']);

module.exports = SensorInterface;
