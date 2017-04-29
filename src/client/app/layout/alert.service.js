(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('AlertService', AlertService);

    function AlertService($rootScope) {
        $rootScope.alerts = [];
        $rootScope.permanentAlerts = [];

        var alertService = {
            clean: function () {
                $rootScope.alerts = [];
                $rootScope.permanentAlerts = [];
            },
            addAlert: function (type, msg) {
                $rootScope.alerts.push({
                    type: type,
                    msg: msg,
                    close: function () {
                        return alertService.closeAlert(this);
                    }
                });
            },
            closeAlert: function (alert) {
                return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
            },
            closeAlertIdx: function (index) {
                return $rootScope.alerts.splice(index, 1);
            },
            addPermanentAlert: function (type, msg) {
                if (!exists(type, msg)) {
                    $rootScope.permanentAlerts.push({
                        type: type,
                        msg: msg,
                        close: function () {
                            return alertService.closePermanentAlert(this);
                        }
                    });
                }
            },
            closePermanentAlert: function (alert) {
                return this.closePermanentAlertIdx($rootScope.permanentAlerts.indexOf(alert));
            },
            closePermanentAlertIdx: function (index) {
                return $rootScope.permanentAlerts.splice(index, 1);
            }
        };

        return alertService;

        function exists(type, msg) {
            for (var i = 0; i < $rootScope.permanentAlerts.length; i++) {
                if ($rootScope.permanentAlerts[i].type === type && $rootScope.permanentAlerts[i].msg === msg) {
                    return true;
                }
            }
        }
    }
})();
