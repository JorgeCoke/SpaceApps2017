(function () {
    'use strict';

    angular
        .module('app.layers')
        .controller('LayersController', LayersController);

    LayersController.$inject = ['$rootScope', '$scope', '$uibModalInstance', '$state'];

    /* @ngInject */
    function LayersController($rootScope, $scope, $uibModalInstance, $state) {
        var vm = this;
        vm.title = 'LayersController';

        vm.update = update;

        $scope.availableLayers = [];

        angular.forEach( $rootScope.layers, function (layer) {
            console.log(layer);
           $scope.availableLayers.push(
               {name: layer.layer, ticked: false}
           )
        });

        function update(){
            angular.forEach( $scope.outputLayers, function( value, key ) {
                $rootScope.selectedLayers.push({
                    name: value.name
                })
            });
            console.log($rootScope.selectedLayers.length);
            $uibModalInstance.dismiss('success');
        }
    }

})();

