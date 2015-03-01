'use strict';

var MeasurementModel = require('../models/measurementModel');

function MeasurementRepository() {

}

MeasurementRepository.prototype.saveMeasurement = function (sensorValue) {
    var modelSensorValue = convertSensorValueToModelSensorValue(sensorValue);
    var toSaveMeasurementModel = new MeasurementModel({
        sensorValues: [modelSensorValue]
    });

    toSaveMeasurementModel.save();
};

function convertSensorValueToModelSensorValue(measurement) {
    return measurement;
}

module.exports = MeasurementRepository;
