'use strict';

(function () {
    angular
        .module('app.modules.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$q', 'toaster', 'measurementResource'];
    function OverviewController($q, toaster, measurementResource) {

        var overviewViewModel = this;
        overviewViewModel.title = 'Overview';
        overviewViewModel.measurements = [];
        overviewViewModel.deleteMeasurement = deleteMeasurement;

        activate();

        function activate() {
            var promises = [getAllMeasurements()];
            return $q.all(promises);
        }

        function getAllMeasurements() {
            measurementResource.query(function (measurements) {
                overviewViewModel.measurements = measurements;
                toaster.pop('info', 'overview.controller.js', measurements.length + ' measurements fetched!');
            });
        }

        function deleteMeasurement(measurement) {
            measurement.$delete(function () {
                toaster.pop('success', 'overview.controller.js', 'Measurement deleted!');
            });

            getAllMeasurements();
        }
    }
})();
