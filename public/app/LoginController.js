(function () {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    //=====================
    LoginController.$inject = ['$location', 'alert', 'auth', 'authToken'];
    function LoginController($location, alert, auth, authToken) {
        var vm = this;
        vm.user = {};

        vm.login = login;
        vm.googleLogin = googleLogin;

        function login(user) {
            auth.login(user)
                .then(function (data) {
                    alert('success', 'Welcome Back', 'Successful login for ' +
                           data.user.username + '!');
                    authToken.setToken(data.token);
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

    }

}());
