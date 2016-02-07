(function() {
    'use strict';
    angular.module('app')
        .service('alert', alert);

    //=====================
    function alert($rootScope, $timeout) {
        var alertTimeout;
        return function (type, title, msg, timeout) {
            $rootScope.alert = {
                hasBeenShown: true,
                show: true,
                type: type,
                message: msg,
                title: title
            };

            $timeout.cancel(alertTimeout);

            alertTimeout = $timeout(function () {
                $rootScope.alert.show = false;
            }, timeout || 2000);
        };
    }
}());
