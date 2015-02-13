var Measurement = require('./models/measurementModel');
var Sensor = require('./models/sensorModel');
var LightMeasurementService = require('./services/lightMeasurementService');
var RoutingService = require('./services/routingService');

var isWindowsPlatform = /^win/.test(process.platform);
LightSensor = isWindowsPlatform ? require('./sensors/lightSensorMock') : require('./sensors/lightSensor');

var lightSensor = new LightSensor();
var lightMeasurementService;

if (lightSensor.initialize()) {
    lightMeasurementService = new LightMeasurementService(lightSensor);
}

if (lightMeasurementService) {
    lightMeasurementService.takeMeasurement(function (measurement) {
        console.log(measurement);
    });
}

/*
 var newMeasurement = new Measurement({
 measurementEntries: [
 {
 typeLabel: 'Temperatur',
 value: 21.2,
 unit: '°C',
 sensorId: 1
 },

 ]
 });

 var newSensor = new Sensor({
 name: 'DHT22',
 description: 'Temperature and Humidity Sensor.'
 });

 var measurementService = new MeasurementService({connection: 'okay'});
 measurementService.saveMeasurement({measurement: '23°C'});

 var routingService = new RoutingService(measurementService);
 routingService.initialize();
 */