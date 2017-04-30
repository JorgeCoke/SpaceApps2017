(function () {
    'use strict';

    angular
        .module('app.landingNormal', [
            'ngMaterial'
        ])
        .config(function ($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = function (date) {
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + '/' + (monthIndex + 1) + '/' + year;
            };
        });
})();
