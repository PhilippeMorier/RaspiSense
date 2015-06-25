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
                controllerAs: 'chartViewModel',
                resolve: {
                    measurements: measurementPreperationResource
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    measurementPreperationResource.$inject = ['measurementResource'];
    function measurementPreperationResource(measurementResource) {
        return measurementResource.query().$promise;
    }
})();