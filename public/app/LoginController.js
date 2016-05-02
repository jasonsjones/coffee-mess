(function () {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    //=====================
    LoginController.$inject = ['$location', 'alert', 'auth', 'authToken', '$auth'];
    function LoginController($location, alert, auth, authToken, $auth) {
        var vm = this;
        vm.user = {};

        vm.login = login;
        vm.googleLogin = googleLogin;
        vm.authenticate = authenticate;

        function login(user) {
            // auth.login(user)
            //     .then(function (data) {
            //         alert('success', 'Welcome Back', 'Successful login for ' +
            //               data.user.username + '!');
            //         authToken.setToken(data.token);
            //         $location.path('/');
            //     }, function (err) {
            //         alert('danger', 'Login Error', 'Unable to login');
            //     });

            $auth.login(user)
                .then(function (res) {
                    alert('success', 'Welcome Back', 'Successful login for ' +
                           res.data.user.username + '!');
                    authToken.setToken(res.data.token);
                    $location.path('/');
                }, function (err) {
                    alert('danger', 'Login Error', 'Unable to login');
                });
        }

        function googleLogin() {
            auth.googleAuth()
                .then(function (data) {
                    alert('success', 'Welcome Back', 'Successful login for ' +
                           data.user.displayName + '!');
                    authToken.setToken(data.token);
                    $location.path('/');
                }, function (err) {
                    alert('danger', 'Login Error', 'Unable to login');
                });
        }

        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function (res) {
                    alert('success', 'Welcome Back', 'Successful login for ' +
                           res.data.user.displayName + '!');
                    authToken.setToken(res.data.token);
                    $location.path('/');
                }, function (err) {
                    alert('danger', 'Login Error', 'Unable to login');
                });

        }

    }

}());
