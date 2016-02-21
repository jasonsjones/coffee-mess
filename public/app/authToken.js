
(function() {
    'use strict';
    angular.module('app')
        .factory('authToken', authToken);

    //=====================
    function authToken($window) {
        var storage = $window.localStorage;
        var cachedToken = null;
        var userToken = 'userToken';

        var authToken = {
            setToken: setToken,
            getToken: getToken,
            removeToken: removeToken,
            isAuthenticated: isAuthenticated
        };

        function setToken(token) {
            cachedToken = token;
            storage.setItem(userToken, token);
        }

        function getToken() {
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        }

        function removeToken() {
            cachedToken = null;
            storage.removeItem(userToken);
        }

        function isAuthenticated() {
            return !!authToken.getToken();
        }

        return authToken;

    }

}());
