'use strict';

(function () {
    angular
        .module('app.modules.chart')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$q', 'measurements'];
    function ChartController($q, measurements) {

        var chartViewModel = this;
        chartViewModel.title = 'Chart';
        chartViewModel.measurements = measurements;
    }
})();
