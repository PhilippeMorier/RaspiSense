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
        measurementViewModel.comment = [];
        measurementViewModel.measurement = [];
        measurementViewModel.takeMeasurement = takeMeasurement;
        measurementViewModel.deleteMeasurement = deleteMeasurement;
        measurementViewModel.updateMeasurementComment = updateMeasurementComment;

        activate();

        function activate() {
            var promises = [getMeasurementById()];
            return $q.all(promises);
        }

        function getMeasurementById() {
            MeasurementResource.get({id: measurementViewModel.id}, function (measurement) {
                measurementViewModel.measurement = measurement;
                measurementViewModel.comment = measurementViewModel.measurement.comment;
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

        function updateMeasurementComment() {
            measurementViewModel.measurement.comment = measurementViewModel.comment;

            measurementViewModel.measurement.$update({id: measurementViewModel.id}, measurementViewModel.measurement);
            toaster.pop('info', 'Comment updated', measurementViewModel.comment);
        }
    }
})();
