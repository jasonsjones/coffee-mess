
(function() {
    'use strict';
    angular.module('app')
        .factory('authToken', authToken);

    //=====================
    function authToken($window) {
        var storage = $window.localStorage;
        var cachedToken = null;

        return {
            setToken: setToken,
            getToken: getToken,
            isAuthenticated: isAuthenticated
        };

        function setToken(token) {
            cachedToken = token;
            storage.setItem('userToken', token);
        }

        function getToken() {
            if (!cachedToken) {
                cachedToken = storage.getItem('userToken');
            }
            return cachedToken;
        }

        function isAuthenticated() {
            return !!this.getToken();
        }

    }

}());
