'use strict';

(function () {
    angular
        .module('app.services')
        .factory('measurementService', MeasurementService);

    MeasurementService.$inject = ['$resource', 'logger'];
    function MeasurementService($http, logger) {
        return {
            getAllMeasurements: getAllMeasurements
        };

        function getAllMeasurements() {
            return $http.get('https://localhost:8080/measurements')
                .then(getAllMeasurementsComplete)
                .catch(getAllMeasurementsFailed);

            function getAllMeasurementsComplete(measurements) {
                return measurements;
            }

            function getAllMeasurementsFailed(error) {
                logger.error('XHR Failed for getAllMeasurements.' + error.data);
            }
        }
    }
})();
