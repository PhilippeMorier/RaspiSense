'use strict';

(function () {
    angular
        .module('app.resources')
        .factory('measurementResource', MeasurementResource);

    MeasurementResource.$inject = ['$resource'];
    function MeasurementResource($resource) {
        return $resource('http://localhost\:8080/measurements/:id', {id: '@_id'});
    }
})();
