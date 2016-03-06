(function() {
    'use strict';
    angular.module('app')
        .factory('auth', auth);

    //=====================
    function auth($q, $http) {

        var factory = {
            register: register,
            login: login
        };

        return factory;

        function register(user) {
            var deferred = $q.defer();

            $http.post('/api/register', user)
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        function login(user) {
            var deferred = $q.defer();

            $http.post('/api/login', user)
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
}());
