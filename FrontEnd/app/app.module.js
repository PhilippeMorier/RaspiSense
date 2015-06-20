'use strict';

(function () {
    angular.module('app', [
        // 3rd party modules
        'ngRoute',
        'ngResource',
        'toaster',
        'highcharts-ng',

        // Our services
        //'app.services',

        // Our resources
        'app.resources',

        // Our modules
        'app.modules.overview',
        'app.modules.measurement',
        'app.modules.chart'
    ]);
})();
