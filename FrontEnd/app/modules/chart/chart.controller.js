'use strict';

(function () {
    angular
        .module('app.modules.chart')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['$q'];
    function ChartController($q) {

        var chartViewModel = this;
        chartViewModel.title = 'Chart';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises);
        }

    }
})();
