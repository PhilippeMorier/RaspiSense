var restify = require('restify');

var routingService = function () {
	var service = {
		initialize: initialize
	};

	return service;
	
	function initialize(measurementService) {
		console.log('initialize()');
		
		var server = restify.createServer({
			name: 'RaspiSense',
			version: '0.0.0'
		});
		server.use(restify.acceptParser(server.acceptable));
		server.use(restify.queryParser());
		server.use(restify.bodyParser());
		 
		server.get('/measurements/:id', function (req, res, next) {
			res.send(req.params);
			return next();
		});
		
		server.post('/measurements', function (req, res, next) {
			res.send(req.params);
			measurementService.takeMeasurement();
			return next();
		});
		 
		server.listen(8080, function () {
			console.log('%s listening at %s', server.name, server.url);
		});
	}
}

module.exports = routingService;