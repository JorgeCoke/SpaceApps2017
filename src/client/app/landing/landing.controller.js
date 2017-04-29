(function () {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.inject = ['$rootScope', '$scope'];

    function LandingController($rootScope, $scope) {
        var vm = this;

        var earth = new WE.map('earth_div');

        var template =
            "//map1{s}.vis.earthdata.nasa.gov/wmts-geo/" +
            "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.png";

        var layer = WE.tileLayer(template, {
            layer: "VIIRS_SNPP_DayNightBand_ENCC",
            tileMatrixSet: "EPSG4326_500m",
            time: "2016-12-04",
            tileSize: 512,
            subdomains: "abc",
            noWrap: true,
            continuousWorld: true,
            // Prevent Leaflet from retrieving non-existent tiles on the
            // borders.
            bounds: [
                [-89.9999, -179.9999],
                [89.9999, 179.9999]
            ]
        });

        $scope.layers = [{name: 'VIIRS_SNPP_DayNightBand_ENCC', ticked: false}];
        $scope.outputLayers = [];

        //layer.addTo(earth);
        //
        // for(var i = 0; i < $rootScope.selectedLayers.length; i++){
        //     console.log('CAPA ' + $rootScope.selectedLayers[i]);
        //     $rootScope.selectedLayers[i].addTo(earth);
        // }

    }
})();
