(function () {
    'use strict';

    angular
        .module('app.layers')
        .factory('ChangeLayersService', ChangeLayersService);

    ChangeLayersService.$inject = ['$uibModal'];

    /* @ngInject */
    function ChangeLayersService($uibModal) {
        var vm = this;

        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open() {
            if (modalInstance !== null) {
                return;
            }
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/layers/layers.html',
                controller: 'LayersController',
                controllerAs: 'vm'
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }

})();

