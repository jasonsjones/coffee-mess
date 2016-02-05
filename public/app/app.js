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
                templateUrl: 'app/main.html'
            })
            .when('/about', {
                templateUrl: 'app/about.html'
            })
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegistrationController',
                controllerAs: 'vm'
            });
    }
}());
