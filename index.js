var Measurement = require('./schemas/measurementSchema');
var Sensor = require('./schemas/sensorSchema');
var MeasurementService = require('./services/measurementService');
var RoutingService = require('./services/routingService');

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

var measurementService = new MeasurementService({ connection: 'okay' });
measurementService.saveMeasurement({ measurement: '23°C' });

var routingService = new RoutingService(measurementService);
routingService.initialize();