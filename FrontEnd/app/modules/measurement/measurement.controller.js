'use strict';

(function () {
    angular
        .module('app.modules.measurement')
        .controller('MeasurementController', MeasurementController);

    MeasurementController.$inject = ['$q', 'toaster', 'measurementResource'];
    function MeasurementController($q, toaster, measurementResource) {

        var measurementViewModel = this;
        measurementViewModel.title = 'Measurement';

        activate();

        function activate() {
            var promises = [getMeasurementById()];
            return $q.all(promises).then(function () {
                toaster.pop('info', 'measurement.controller.js', 'Activated and all data loaded!');
            });
        }

        function getMeasurementById() {
        }
    }
})();
