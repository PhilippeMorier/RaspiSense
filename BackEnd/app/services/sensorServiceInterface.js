'use strict';

var Interface = require('../interface');
var SensorServiceInterface = new Interface('SensorServiceInterface', ['readSensor']);

module.exports = SensorServiceInterface;
