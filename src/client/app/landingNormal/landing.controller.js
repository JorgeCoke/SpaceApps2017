(function () {
    'use strict';

    angular
        .module('app.landingNormal')
        .controller('StaticController', StaticController);

    StaticController.inject = ['$rootScope', '$scope', '$state'];

    function StaticController($rootScope, $scope, $state) {
        var vm = this;

        var earth = L.map('earth_div').setView([60, 50], 3);
        earth.zoomControl.setPosition('bottomleft');

        // var ourCustomControl = L.Control.extend({
        //
        //     options: {
        //         position: 'bottomleft'
        //         //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
        //     },
        //
        //     onAdd: function (earth) {
        //         // var container = L.DomUtil.create('div', 'isteven-multi-select ' +
        //         //     'input-model="layers" ' +
        //         //     'output-model="outputLayers" ' +
        //         //     'button-label="icon name" ' +
        //         //     'item-label="icon name maker" ' +
        //         //     'tick-property="ticked" ' +
        //         //     'on-item-click="vm.checkLayers(data)" ' +
        //         //     'on-select-all="vm.selectAllLayers()" ' +
        //         //     'on-select-none="vm.resetLayers()" ' +
        //         //     'on-reset="vm.resetLayers()"');
        //
        //         var container = document.querySelector('#dropdown');
        //
        //         container.style.backgroundColor = 'white';
        //         container.style.width = '30px';
        //         container.style.height = '30px';
        //
        //         container.onclick = function(){
        //             console.log('buttonClicked');
        //         };
        //         return container;
        //     }
        //
        // });
        //
        // earth.addControl(new ourCustomControl());

        // var zoom = L.control.zoom({
        //     position:'bottomLeft'
        // });
        // earth.addControl(zoom);


        var openStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a  href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }).addTo(earth);

        $scope.layers = [
            // {name: 'natural', ticked: false, opacity: 0.8},
            // {name: 'toner', ticked: false, opacity: 0.2},

            {name: 'VIIRS_CityLights_2012', ticked: false, opacity: 0.6, format: 'jpg', maxZoom: 8},
            {name: 'MODIS_Terra_Land_Surface_Temp_Day', ticked: false, opacity: 0.4, format: 'png', maxZoom: 7},
            {name: 'MODIS_Terra_Snow_Cover', ticked: false, opacity: 0.4, format: 'png', maxZoom: 8},
            {name: 'MODIS_Aqua_CorrectedReflectance_Bands721', ticked: false, opacity: 0.4, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Aqua_SurfaceReflectance_Bands121', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Terra_CorrectedReflectance_TrueColor', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'MODIS_Terra_SurfaceReflectance_Bands121', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM3-I3-M11', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_TrueColor', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'VIIRS_SNPP_CorrectedReflectance_BandsM11-I2-I1', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9 },
            {name: 'MODIS_Aqua_CorrectedReflectance_Bands721', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 9},
            {name: 'Coastlines', ticked: false, opacity: 0.8, format: 'png', maxZoom: 9},
            {name: 'Reference_Features', ticked: false, opacity: 0.8, format: 'png', maxZoom: 9},
            {name: 'BlueMarble_ShadedRelief', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 8},
            {name: 'BlueMarble_NextGeneration', ticked: false, opacity: 0.8, format: 'jpg', maxZoom: 8}

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

        function parseDate(date) {
            return date.getFullYear() + '-' +
                ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);
        }

        function selectAllLayers() {
        }

        function resetLayers() {
            // for(var i = 0; i < layersHash.length; i++){
            //     layersHash[i].layer.removeFrom(earth);
            // }
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
                    // var aux = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/' + data.name + '/default/{time}/{tilematrixset}{level}/{z}/{y}/{x}.{format}', {
                    //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
                    //     minZoom: 1,
                    //     maxZoom: 5,
                    //     level: data.maxZoom,
                    //     format: data.format,
                    //     time: parseDate(vm.date),
                    //     tilematrixset: 'GoogleMapsCompatible_Level',
                    //     opacity: data.opacity
                    // });
                    var aux = new L.GIBSLayer(data.name, {
                        date: new Date('2015/04/01'),
                        level: data.maxZoom,
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

    }
})();
