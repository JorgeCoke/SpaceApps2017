(function () {
    'use strict';

    angular
        .module('app.layout.navbar')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            bindToController: true,
            controller: NavbarController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/navbar/navbar.html'
        };

        NavbarController.$inject = ['$rootScope', '$scope', 'ChangeLayersService'];

        function NavbarController($rootScope, $scope, ChangeLayersService) {
            //console.log("Navbar controller called!");
            var vm = this;
            $scope.isCollapsed = true;

            vm.showLayers = showLayers;

            function showLayers(){
                ChangeLayersService.open();
            }
        }

        return directive;
    }
})();
