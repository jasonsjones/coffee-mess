(function () {
    'use strict';
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    //=====================
    function RegistrationController(alert, auth, authToken) {
        var vm = this;
        vm.user = {};

        vm.submit = submit;

        function submit(user) {
            auth.register(user)
                .then(function (data) {
                    console.log(data.user);
                    alert('info', 'Welcome, ', data.user.username + '. You are now registered', 3000);
                    authToken.setToken(data.token);
                });
        }
    }
}());
