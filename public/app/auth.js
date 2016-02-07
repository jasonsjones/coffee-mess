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

        function register(user) {
            var deferred = $q.defer();

            deferred.resolve({success: true, msg: 'user registered', name: user.username});

            return deferred.promise;

        }
    }
}());
