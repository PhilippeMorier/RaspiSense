'use strict';

(function () {
    angular
        .module('app.modules.overview')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/overview', {
                templateUrl: 'app/modules/overview/overview.view.html',
                controller: 'OverviewController',
                controllerAs: 'overviewViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
