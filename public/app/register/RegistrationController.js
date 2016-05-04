(function () {
    'use strict';
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    //=====================
    RegistrationController.$inject = ['$location', 'alert', 'auth', 'authToken', '$auth'];
    function RegistrationController($location, alert, auth, authToken, $auth) {
        var vm = this;
        vm.user = {};

        vm.submit = submit;

        function submit(user) {
            $auth.signup(user)
            //auth.register(user)
                // .then(function (data) {
                .then(function (res) {
                    console.log(res.data.user);
                    alert('success', 'Account Created!',  'Welcome, ' + res.data.user.username +
                          '. You are now registered.', 3000);
                    authToken.setToken(res.data.token);
                    $location.path('/');
                }, function (err) {
                    alert('danger', 'Account Error', 'Unable to register account');
                    vm.user = {};
                });
        }
    }
}());
