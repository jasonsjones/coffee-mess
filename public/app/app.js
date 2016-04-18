(function() {
    'use strict';

    angular.module('app')
        .config(config).run(runFn);

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
                templateUrl: 'app/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
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

    function runFn($window) {
        var params = $window.location.search.substring(1);
        if (params && $window.opener &&
            $window.opener.location.origin === $window.location.origin) {
            var pair = params.split('=');
            var code = decodeURIComponent(pair[1]);

            $window.opener.postMessage(code, $window.location.origin);
        }
    }
}());
