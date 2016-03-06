(function (){
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    //=====================
    LoginController.$inject = ['$location', 'alert', 'auth', 'authToken'];
    function LoginController($location, alert, auth, authToken) {
        var vm = this;
        vm.user = {};

        vm.login = login;

        function login(user) {
            console.log('just fired login in LoginController');
            auth.login(user)
                .then(function (data) {
                    console.log(data);
                    alert('success', 'Welcome Back', 'Successful login for ' +
                           data.user.username + '!');
                    authToken.setToken(data.token);
                    $location.path('/');
                }, function (err) {
                    alert('danger', 'Login Error', 'Unable to login');
                });
        }

    }

}());
