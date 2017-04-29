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

        var natural = WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
            tileSize: 256,
            tms: true
        });
        //natural.addTo(earth);

        var toner = WE.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
            opacity: 0.2
        });
        //toner.addTo(earth);

        var openStreetMap = WE.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {});

        var NASAGIBS_ViirsEarthAtNight2012 = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 8,
            format: 'jpg',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level'
        });
        //NASAGIBS_ViirsEarthAtNight2012.addTo(earth);

        var NASAGIBS_ModisTerraLSTDay = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Land_Surface_Temp_Day/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 7,
            format: 'png',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level',
            opacity: 0.75
        });
        //NASAGIBS_ModisTerraLSTDay.addTo(earth);

        var NASAGIBS_ModisTerraSnowCover = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Snow_Cover/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 8,
            format: 'png',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level',
            opacity: 0.75
        });
        //NASAGIBS_ModisTerraSnowCover.addTo(earth);

        var NASAGIBS_ModisTerraChlorophyll = WE.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_Chlorophyll_A/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
            attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
            bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
            minZoom: 1,
            maxZoom: 7,
            format: 'png',
            time: '',
            tilematrixset: 'GoogleMapsCompatible_Level',
            opacity: 0.75
        });
        //NASAGIBS_ModisTerraChlorophyll.addTo(earth);

        var template2 =
            "//map1{s}.vis.earthdata.nasa.gov/wmts-webmerc/" +
            "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";
        var layerrr = WE.tileLayer(template2, {
            layer: "MODIS_Aqua_CorrectedReflectance_Bands721",
            tileMatrixSet: "GoogleMapsCompatible_Level9",
            time: "2013-12-04",
            tileSize: 256,
            subdomains: "abc",
            noWrap: true,
            continuousWorld: true,
            // Prevent Leaflet from retrieving non-existent tiles on the
            // borders.
            bounds: [
                [-85.0511287776, -179.999999975],
                [85.0511287776, 179.999999975]
            ]
        });

        $scope.layers = [
          {name: 'natural', ticked: false, opacity: 0.8},
          {name: 'toner', ticked: false, opacity: 0.2},
          {name: 'Open Street Map', ticked: false, opacity: 0.9},

            {name: 'NASAGIBS_ViirsEarthAtNight2012', ticked: false, opacity: 0.6},
            {name: 'NASAGIBS_ModisTerraLSTDay', ticked: false, opacity: 0.4},
            {name: 'NASAGIBS_ModisTerraSnowCover', ticked: false, opacity: 0.4},
            {name: 'NASAGIBS_ModisTerraChlorophyll', ticked: false, opacity: 0.4},
            {name: 'MODIS_Aqua_CorrectedReflectance_Bands721', ticked: false, opacity: 0.4}

        ];
        $scope.outputLayers = [];

        var layersHash = [
          {layer: natural, name: 'natural'},
          {layer: toner, name: 'toner'},
          {layer: openStreetMap, name: 'Open Street Map'},

            {layer: NASAGIBS_ViirsEarthAtNight2012, name: 'NASAGIBS_ViirsEarthAtNight2012'},
            {layer: NASAGIBS_ModisTerraLSTDay, name: 'NASAGIBS_ModisTerraLSTDay'},
            {layer: NASAGIBS_ModisTerraSnowCover, name: 'NASAGIBS_ModisTerraSnowCover'},
            {layer: layerrr, name: 'MODIS_Aqua_CorrectedReflectance_Bands721'}
        ];

        vm.checkLayers = checkLayers;
        vm.selectAllLayers = selectAllLayers;
        vm.resetLayers = resetLayers;

        vm.capas = [];

        function selectAllLayers(){}

        function resetLayers(){
            // for(var i = 0; i < layersHash.length; i++){
            //     layersHash[i].layer.removeFrom(earth);
            // }
            $state.reload();
        }

        function checkLayers(data){
            console.log(data);
                for(var i = 0; i < layersHash.length; i++){
                    if(layersHash[i].name === data.name && data.ticked){
                      console.log("añado capa", layersHash[i]);
                      console.log(data);
                        layersHash[i].layer.addTo(earth);
                        layersHash[i].layer.setOpacity(data.opacity);
                    }
                    else if (layersHash[i].name === data.name && !data.ticked){
                      console.log("elimino capa");
                        layersHash[i].layer.setOpacity(0);
                    }
                }
        }

    }
})();
