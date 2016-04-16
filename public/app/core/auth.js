(function() {
    'use strict';
    angular.module('app')
        .factory('auth', auth);

    //=====================
    function auth($q, $http, $window) {

        var factory = {
            register: register,
            login: login,
            googleAuth: googleAuth
        };

        return factory;

        function register(user) {
            var deferred = $q.defer();

            $http.post('/api/register', user)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function login(user) {
            var deferred = $q.defer();

            $http.post('/api/login', user)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function googleAuth() {
            console.log('firing googleAuth in the auth service');
            var url = 'https://accounts.google.com/o/oauth2/auth';

            var options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 +
                          ', top =' + ($window.outerHeight - 500) / 2.5;

            $window.open(url, '', options);
        }
    }
}());
