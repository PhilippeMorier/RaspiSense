'use strict';

(function () {
    angular
        .module('app.modules.measurement')
        .controller('MeasurementController', MeasurementController);

    MeasurementController.$inject = ['$q', '$routeParams', 'toaster', 'measurementResource'];
    function MeasurementController($q, $routeParams, toaster, MeasurementResource) {

        var measurementViewModel = this;
        measurementViewModel.title = 'Measurement';
        measurementViewModel.id = $routeParams.id;
        measurementViewModel.measurement = [];
        measurementViewModel.takeMeasurement = takeMeasurement;
        measurementViewModel.deleteMeasurement = deleteMeasurement;

        activate();

        function activate() {
            var promises = [getMeasurementById()];
            return $q.all(promises);
        }

        function getMeasurementById() {
            MeasurementResource.get({id: measurementViewModel.id}, function (measurement) {
                measurementViewModel.measurement = measurement;
                toaster.pop('info', 'measurement.controller.js', 'Measurement fetched!');
            });
        }

        function takeMeasurement() {
            var measurement = new MeasurementResource();
            measurement.$save(function () {
                toaster.pop('success', 'measurement.controller.js', 'Measurement taken!');
            });
        }

        function deleteMeasurement() {
            measurementViewModel.measurement.$delete(function () {
                toaster.pop('success', 'measurement.controller.js', 'Measurement deleted!');
            });
        }
    }
})();
