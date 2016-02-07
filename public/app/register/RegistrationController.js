(function () {
    'use strict';
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    //=====================
    function RegistrationController(alert, auth) {
        var vm = this;
        vm.user = {};

        vm.submit = submit;

        function submit(user) {
            auth.register(user)
                .then(function (data) {
                    alert('info', 'Welcome, ', data.name + '. You are now registered', 3000);
                });
        }
    }
}());
