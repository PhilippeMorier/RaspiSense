'use strict';

(function () {
    angular
        .module('app.modules.chart')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/chart', {
                templateUrl: 'app/modules/chart/chart.view.html',
                controller: 'ChartController',
                controllerAs: 'chartViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
