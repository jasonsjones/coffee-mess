(function () {
    'use strict';
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    //=====================
    RegistrationController.$inject = ['$location', 'alert', 'auth', 'authToken'];
    function RegistrationController($location, alert, auth, authToken) {
        var vm = this;
        vm.user = {};

        vm.submit = submit;

        function submit(user) {
            auth.register(user)
                .then(function (data) {
                    console.log(data.user);
                    alert('success', 'Account Created!',  'Welcome, ' + data.user.username +
                          '. You are now registered.', 3000);
                    authToken.setToken(data.token);
                    $location.path('/');
                });
        }
    }
}());
