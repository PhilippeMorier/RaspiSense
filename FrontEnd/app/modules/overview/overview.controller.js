'use strict';

(function () {
    angular
        .module('app.modules.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$q', 'toaster', 'measurementResource'];
    function OverviewController($q, toaster, MeasurementResource) {

        var overviewViewModel = this;
        overviewViewModel.title = 'Overview';
        overviewViewModel.measurements = [];
        overviewViewModel.takeMeasurement = takeMeasurement;
        overviewViewModel.deleteMeasurement = deleteMeasurement;

        activate();

        function activate() {
            var promises = [getAllMeasurements()];
            return $q.all(promises);
        }

        function getAllMeasurements() {
            MeasurementResource.query(function (measurements) {
                overviewViewModel.measurements = measurements;
            });
        }

        function takeMeasurement() {
            var measurement = new MeasurementResource();
            measurement.$save(function () {
                getAllMeasurements();
                toaster.pop('success', 'overview.controller.js', 'Measurement taken!');
            });
        }

        function deleteMeasurement(measurement) {
            measurement.$delete(function () {
                getAllMeasurements();
                toaster.pop('success', 'overview.controller.js', 'Measurement deleted!');
            });
        }
    }
})();
