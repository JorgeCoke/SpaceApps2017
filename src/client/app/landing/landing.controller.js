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

        // var natural = WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
        //     tileSize: 256,
        //     tms: true
        // });
        // //natural.addTo(earth);
        //
        // var toner = WE.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        //     attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
        //     opacity: 0.2
        // });
        // //toner.addTo(earth);
        //
        var openStreetMap = WE.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {opacity: 1.0});
        openStreetMap.addTo(earth);
        //
        // var VIIRS_CityLights_2012 = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        //     attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        //     minZoom: 1,
        //     maxZoom: 8,
        //     format: 'jpg',
        //     time: '',
        //     tilematrixset: 'GoogleMapsCompatible_Level'
        // });
        // //NASAGIBS_ViirsEarthAtNight2012.addTo(earth);
        //
        // var MODIS_Terra_Land_Surface_Temp_Day = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Land_Surface_Temp_Day/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        //     attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        //     minZoom: 1,
        //     maxZoom: 7,
        //     format: 'png',
        //     time: '',
        //     tilematrixset: 'GoogleMapsCompatible_Level',
        //     opacity: 0.75
        // });
        // //NASAGIBS_ModisTerraLSTDay.addTo(earth);
        //
        // var MODIS_Terra_Snow_Cover = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Snow_Cover/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        //     attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        //     minZoom: 1,
        //     maxZoom: 8,
        //     format: 'png',
        //     time: '',
        //     tilematrixset: 'GoogleMapsCompatible_Level',
        //     opacity: 0.75
        // });
        // //NASAGIBS_ModisTerraSnowCover.addTo(earth);
        //
        // var MODIS_Terra_Chlorophyll_A = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Chlorophyll_A/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
        //     attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
        //     bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
        //     minZoom: 1,
        //     maxZoom: 7,
        //     format: 'png',
        //     time: '',
        //     tilematrixset: 'GoogleMapsCompatible_Level',
        //     opacity: 0.75
        // });
        // //NASAGIBS_ModisTerraChlorophyll.addTo(earth);
        //
        // var template2 =
        //     "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" +
        //     "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";
        // var MODIS_Aqua_CorrectedReflectance_Bands721 = WE.tileLayer(template2, {
        //     layer: "MODIS_Aqua_CorrectedReflectance_Bands721",
        //     tileMatrixSet: "GoogleMapsCompatible_Level9",
        //     time: "2013-12-04",
        //     tileSize: 256,
        //     subdomains: "abc",
        //     noWrap: true,
        //     continuousWorld: true,
        //     // Prevent Leaflet from retrieving non-existent tiles on the
        //     // borders.
        //     bounds: [
        //         [-85.0511287776, -179.999999975],
        //         [85.0511287776, 179.999999975]
        //     ]
        // });

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

    }
})();
