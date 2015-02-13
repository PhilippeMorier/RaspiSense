function LightMeasurementService(lightSensor) {
    this.lightSensor = lightSensor;
}

LightMeasurementService.prototype.takeMeasurement = function (callback) {
    this.lightSensor.read(function (value) {
        callback({
            typeLabel: 'Light',
            value: value,
            unit: 'Lux',
            sensorId: 1
        });
    });
};

module.exports = LightMeasurementService;