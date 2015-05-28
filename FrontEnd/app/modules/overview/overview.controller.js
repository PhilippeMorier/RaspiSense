'use strict';

(function () {
    angular
        .module('app.modules.overview')
        .controller('OverviewController', OverviewController);

    OverviewController.$inject = ['$q'];
    function OverviewController($q) {

        var overviewViewModel = this;
        overviewViewModel.title = 'Overview PAENG!';

        activate();

        function activate() {
            var promises = [];
            return $q.all(promises).then(function () {
                console.info('Activated Overview Controller');
            });
        }
    }
})();
