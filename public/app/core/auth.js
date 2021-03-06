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
            var deferred = $q.defer();

            var queryBuilder = [];
            queryBuilder.push('response_type=code',
                            'client_id=334060514002-4f8a59tvvntacl6vb21oa762o4h9s89p.apps.googleusercontent.com',
                            'redirect_uri=' + $window.location.origin +'/oauth/callback',
                            'scope=profile email');

            var url = 'https://accounts.google.com/o/oauth2/auth?' + queryBuilder.join('&');

            var options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 +
                          ', top =' + ($window.outerHeight - 500) / 2.5;

            var popUp = $window.open(url, '', options);
            $window.focus();

            $window.addEventListener('message', function (event) {
                if (event.origin === $window.location.origin) {
                    var code = event.data;
                    popUp.close();

                    $http.post('api/auth/google', {
                        code: code
                    }).success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        deferred.reject(err);
                    });
                }
            });
            return deferred.promise;
        }
    }
}());
