(function () {
    'use strict';
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    //=====================
    function RegistrationController(alert) {
        var vm = this;
        vm.user = {};

        vm.submit = submit;

        function submit() {
            console.log('submitting form...');
        }
    }
}());
