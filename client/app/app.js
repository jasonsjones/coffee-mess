(function() {
    'use strict';

    angular.module('app')
        .config(config);

    //==================
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                template: '<h1>Hello Angular<h1>'
            });
    }
}());
