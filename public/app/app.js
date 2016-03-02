(function() {
    'use strict';

    angular.module('app')
        .config(config);

    //==================
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'app/main.html'
            })
            .when('/about', {
                templateUrl: 'app/about.html'
            })
            .when('/login', {
                templateUrl: 'app/login.html'
            })
            .when('/register', {
                templateUrl: 'app/register/register.html',
                controller: 'RegistrationController',
                controllerAs: 'vm'
            })
            .when('/coffee', {
                templateUrl: 'app/coffee/coffee.html',
                controller: 'CoffeeController',
                controllerAs: 'vm'
            });

        $httpProvider.interceptors.push('authInterceptor');
    }
}());
