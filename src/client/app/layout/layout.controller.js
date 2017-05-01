(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('LayoutController', LayoutController);

    function LayoutController() {
        var vm = this;
        vm.navline = {
            title: 'Space Apps 2017'
        };
    }
})();
