var MeasurementModel = require('../models/measurementModel');

function MeasurementRepository() {
}

MeasurementRepository.prototype.saveMeasurement = function (measurement) {
    var repoMeasurement = convertMeasurementToMeasurementSchema(measurement);
    var toSaveMeasurement = new MeasurementModel({
        measurementEntries: [{
            typeLabel: 'Temperature',
            value: 21.2,
            unit: '°C',
            sensorId: 1
        }]
    });

    toSaveMeasurement.save();
};

function convertMeasurementToMeasurementSchema(measurement) {
    return measurement;
}

module.exports = MeasurementRepository;