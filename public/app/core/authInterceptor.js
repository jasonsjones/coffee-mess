(function (){
    'use strict';

    angular.module('app')
        .factory('authInterceptor', authInterceptor);

    //=====================
    authInterceptor.$inject = ['authToken'];
    function authInterceptor(authToken) {
        var factory = {
            request: request,
            response: response
        };

        return factory;

        function request(config) {
            var token = authToken.getToken();

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }

        function response(response) {
            return response;
        }
    }

}());
