(function() {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    //=====================
    NavController.$inject = ['$location', 'authToken'];
    function NavController($location, authToken) {
        var vm = this;

        vm.isAuthenticated = authToken.isAuthenticated;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
}());
