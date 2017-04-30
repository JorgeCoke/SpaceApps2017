(function () {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.inject = ['$rootScope', '$scope', '$state'];

    function LandingController($rootScope, $scope, $state) {
        var vm = this;

        var earth = new WE.map('earth_div', {
            sky: true,
            atmosphere: true
        });

        var openStreetMap = WE.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {opacity: 1.0});
        openStreetMap.addTo(earth);


        $scope.layers = [
            // {name: 'natural', ticked: false, opacity: 0.8},
            // {name: 'toner', ticked: false, opacity: 0.2},

            {name: 'VIIRS_CityLights_2012', ticked: false, opacity: 0.6, format: 'jpg', maxZoom: 8},
            {name: 'MODIS_Terra_Land_Surface_Temp_Day', ticked: false, opacity: 0.4, format: 'png', maxZoom: 7},
            {name: 'MODIS_Terra_Snow_Cover', ticked: false, opacity: 0.4, format: 'png', maxZoom: 8},
            {name: 'MODIS_Aqua_CorrectedReflectance_Bands721', ticked: false, opacity: 0.4, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Aqua_SurfaceReflectance_Bands121', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Terra_CorrectedReflectance_TrueColor', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Terra_SurfaceReflectance_Bands121', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM3-I3-M11', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_TrueColor', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Aqua_CorrectedReflectance_Bands721', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 9},
            {name: 'Coastlines', ticked: false, opacity:0.8, format: 'png', maxZoom: 9},
            {name: 'Reference_Features', ticked: false, opacity:0.8, format: 'png', maxZoom: 9},
            {name: 'BlueMarble_ShadedRelief', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 8},
            {name: 'BlueMarble_NextGeneration', ticked: false, opacity:0.8, format: 'jpg', maxZoom: 8}

        ];
        $scope.outputLayers = [];

        var layersHash = [
            // {layer: natural, name: 'natural'},
            // {layer: toner, name: 'toner'},
            {layer: openStreetMap, name: 'Open Street Map'},

            {layer: null, name: 'VIIRS_CityLights_2012'},
            {layer: null, name: 'MODIS_Terra_Land_Surface_Temp_Day'},
            {layer: null, name: 'MODIS_Terra_Snow_Cover'},
            {layer: null, name: 'MODIS_Aqua_CorrectedReflectance_Bands721'},
            {layer: null, name: 'MODIS_Aqua_SurfaceReflectance_Bands121'},
            {layer: null, name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1'},
            {layer: null, name: 'MODIS_Terra_CorrectedReflectance_TrueColor'},
            {layer: null, name: 'MODIS_Terra_SurfaceReflectance_Bands121'},
            {layer: null, name: 'VIIRS_SNPP_CorrectedReflectance_BandsM3-I3-M11'},
            {layer: null, name: 'VIIRS_SNPP_CorrectedReflectance_TrueColor'},
            {layer: null, name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1'},
            {layer: null, name: 'MODIS_Aqua_CorrectedReflectance_Bands721'},
            {layer: null, name: 'Coastlines'},
            {layer: null, name: 'Reference_Features'},
            {layer: null, name: 'BlueMarble_ShadedRelief'},
            {layer: null, name: 'BlueMarble_NextGeneration'}
        ];

        vm.checkLayers = checkLayers;
        vm.selectAllLayers = selectAllLayers;
        vm.resetLayers = resetLayers;

        vm.date = new Date();
        vm.capas = [];

        function parseDate(date){
            return date.getFullYear() + '-' +
                ('0' + (date.getMonth()+1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);
        }

        function selectAllLayers() {
        }

        function resetLayers() {
            $state.reload();
        }

        function checkLayers(data) {
            //console.log(data);
            for (var i = 0; i < layersHash.length; i++) {
                if (layersHash[i].name === data.name && data.ticked) {
                    // console.log("añado capa", layersHash[i]);
                    // console.log(data);
                    // console.log("añado capa");
                    // console.log(layersHash[i].layer);
                    var aux = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/' + data.name + '/default/{time}/{tilematrixset}{level}/{z}/{y}/{x}.{format}', {
                        bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
                        minZoom: 1,
                        maxZoom: 5,
                        level: data.maxZoom,
                        format: data.format,
                        time: parseDate(vm.date),
                        tilematrixset: 'GoogleMapsCompatible_Level',
                        opacity: data.opacity
                    });
                    layersHash[i].layer = aux;
                    aux.addTo(earth);
                    // layersHash[i].layer.addTo(earth);
                    // layersHash[i].layer.setOpacity(data.opacity);
                }
                else if (layersHash[i].name === data.name && !data.ticked) {
                    // console.log("elimino capa");
                    layersHash[i].layer.setOpacity(0);
                }
            }
        }

        Leap.loop({background: true},function(frame) {
                  frame.hands.forEach(function(hand, index) {
                    //console.log(hand.screenPosition());
                    //console.log(earth.getZoom());
                    var escalaBig;
                    if (earth.getZoom() < 7){
                      escalaBig = Math.abs(0.65-earth.getZoom())/10;
                    } else if (earth.getZoom() < 10 && earth.getZoom() > 7) {
                      escalaBig = Math.abs(0.65-earth.getZoom())/15;
                    } else{
                      escalaBig = Math.abs((0.625-earth.getZoom()/25))/100;
                    }
                    console.log(earth.getZoom(),escalaBig);

                    var c = earth.getPosition();
                    if (hand.screenPosition()[0] < 300){
                      c[1] = c[1] - escalaBig;
                    }
                    else if (hand.screenPosition()[0] > 500){
                      c[1] = c[1] + escalaBig;
                    }
                    if (hand.screenPosition()[1] < 300){
                      c[0] = c[0] + escalaBig;
                    }
                    else if (hand.screenPosition()[1] > 500){
                      c[0] = c[0] - escalaBig;
                    }
                    earth.setCenter([c[0], c[1]]);
                    if (hand.screenPosition()[2] < -150){
                      earth.setZoom(earth.getZoom()+0.05);
                    }
                    else if (hand.screenPosition()[2] > 200){
                      earth.setZoom(earth.getZoom()-0.05);
                    }
                  });
                }).use('screenPosition', {scale: 0.25}).use('boneHand', {
              targetEl: document.body,
              arm: false
                });

    }
})();
