'use strict';

var MeasurementModel = require('../models/measurementModel');

function MeasurementRepository() {

}

MeasurementRepository.prototype.saveMeasurement = function (sensorValues) {
    var toSaveMeasurementModel = new MeasurementModel({
        sensorValues: sensorValues
    });

    toSaveMeasurementModel.save(function (error) {
        if (error) {
            throw error;
        }
    });
};

// measurementRepository.getAllMeasurements(function (error, measurements) {};
MeasurementRepository.prototype.getAllMeasurements = function (callback) {
    MeasurementModel
        .find()
        .exec(function (error, measurements) {
            callback(error, measurements);
        });
};

// measurementRepository.getMeasurementFromId('54f1d92a79568a3c0a5916bd', function (error, measurement) {};
MeasurementRepository.prototype.getMeasurementFromId = function (id, callback) {
    MeasurementModel
        .findById(id)
        .exec(function (error, measurement) {
            callback(error, measurement);
        });
};

// measurementRepository.getMeasurementInDateRange(new Date('2015/03/01 15:24:14'), Date.now(), function (error, measurements) {};
MeasurementRepository.prototype.getMeasurementInDateRange = function (startDate, endDate, callback) {
    MeasurementModel
        .where('takenOn')
        .gt(startDate)
        .lt(endDate)
        .exec(function (error, measurements) {
            callback(error, measurements);
        });
};

MeasurementRepository.prototype.deleteMeasurementFromId = function (id, callback) {
    MeasurementModel
        .findById(id)
        .remove()
        .exec(function (error) {
            callback(error);
        });
};

module.exports = MeasurementRepository;
