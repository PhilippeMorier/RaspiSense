'use strict';

(function () {
    angular
        .module('app.modules.measurement')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/measurement/:id?', {
                templateUrl: 'app/modules/measurement/measurement.view.html',
                controller: 'MeasurementController',
                controllerAs: 'measurementViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
