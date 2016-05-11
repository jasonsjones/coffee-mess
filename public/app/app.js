(function() {
    'use strict';

    angular.module('app')
        .config(config).run(runFn);

    //==================
    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$authProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, $authProvider) {
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

        $authProvider.loginUrl = '/api/login'   ;
        $authProvider.signupUrl = '/api/register';

        $authProvider.google({
            clientId: '334060514002-4f8a59tvvntacl6vb21oa762o4h9s89p.apps.googleusercontent.com',
            url: '/api/auth/google',
            redirectUri:  'https://coffee-mess-jsj0nes.c9users.io/oauth/callback'
        });

        $authProvider.facebook({
            clientId: '1727162664168803',
            url: '/api/auth/facebook'
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
