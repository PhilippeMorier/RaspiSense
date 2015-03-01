'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeLabels = ['Temperature', 'Humidity', 'Light', 'Pressure'];
var sensorValueSchema = new Schema({
	typeLabel: { type: String, required: true, enum: typeLabels },
	value: { type: Number, required: true },
	unit: { type: String, required: true },
	sensorId: { type: Number, required: true }
});

var measurementSchema = new Schema({
	takenOn: { type: Date, default: Date.now },
	sensorValues: [ sensorValueSchema ]
});

module.exports = mongoose.model('Measurement', measurementSchema);
