var measurementService = function (mongoDbConnection) {
	var service = {
		saveMeasurement: saveMeasurement,
		loadMeasurements: loadMeasurements,
		takeMeasurement: takeMeasurement
	};

	return service;
	
	function saveMeasurement(measurement) {
		console.log('saveMeasurement()');
	}
	
	function loadMeasurements(startTakenOn, maxMeasurementsPerPage) {
		console.log('loadMeasurement()');
	}
	
	function takeMeasurement() {
		console.log('takeMeasurement()');
	}
}

module.exports = measurementService;