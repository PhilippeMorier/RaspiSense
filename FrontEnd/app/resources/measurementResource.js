'use strict';

(function () {
    angular
        .module('app.resources')
        .factory('measurementResource', MeasurementResource);

    MeasurementResource.$inject = ['$resource'];
    function MeasurementResource($resource) {
        return $resource('http://10.0.0.10\:8080/measurements/:id',
            {
                id: '@_id'
            },
            {
                'update': {method: 'PUT'}
            });
    }
})();
