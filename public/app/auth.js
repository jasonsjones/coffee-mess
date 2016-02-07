(function() {
    'use strict';
    angular.module('app')
        .factory('auth', auth);

    //=====================
    function auth($q) {

        var factory = {
            register: register
        };

        return factory;

        function register() {
            var deferred = $q.defer();

            deferred.resolve({success: true, msg: 'user registered', name: 'jason'});

            return deferred.promise;

        }
    }
}());
