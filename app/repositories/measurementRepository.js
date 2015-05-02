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

MeasurementRepository.prototype.getAllMeasurements = function (callback) {
    MeasurementModel
        .find()
        .exec(function (error, measurements) {
            callback(error, measurements);
        });
};

MeasurementRepository.prototype.getMeasurement = function (id, callback) {
    MeasurementModel
        .findById(id)
        .exec(function (error, measurement) {
            callback(error, measurement);
        });
};

MeasurementRepository.prototype.getMeasurementInDateRange = function (startDate, endDate, callback) {
    MeasurementModel
        .where('takenOn')
        .gt(startDate)
        .lt(endDate)
        .exec(function (error, measurements) {
            callback(error, measurements);
        });
};

module.exports = MeasurementRepository;
