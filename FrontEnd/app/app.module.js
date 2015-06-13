'use strict';

(function () {
    angular.module('app', [
        // 3rd party modules
        'ngRoute',
        'ngResource',
        'toaster',

        // Our services
        //'app.services',

        // Our resources
        'app.resources',

        // Our modules
        'app.modules.overview',
        'app.modules.measurement'
    ]);
})();
