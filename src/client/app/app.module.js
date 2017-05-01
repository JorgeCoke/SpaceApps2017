(function () {
    'use strict';

    angular
        .module('app', [
            'isteven-multi-select',
            'ngSanitize',
            'ui.router',
            'ngAnimate',
            'app.landing',
            'app.layout'
        ])
        .config(function ($stateProvider, $urlRouterProvider, $logProvider, $locationProvider) {
            $logProvider.debugEnabled(false);
            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/404');

            $stateProvider
                .state('notFound', {        //Not found page
                    url: '/404',
                    templateUrl: 'app/templates/404.html'
                })
                .state('landing', {
                    url: '/',
                    templateUrl: 'app/landing/landing.html',
                    controller: 'LandingController as vm'
                });
        });
})();
