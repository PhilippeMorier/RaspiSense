'use strict';

(function () {
    angular
        .module('app.modules.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$q', 'toaster'];
    function OverviewController($q, toaster) {

        var overviewViewModel = this;
        overviewViewModel.title = 'Overview';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function () {
                toaster.pop('info', 'overview.controller.js', 'Activated!');
            });
        }
    }
})();
