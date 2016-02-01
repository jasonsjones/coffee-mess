(function() {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    //=====================
    NavController.$inject = ['$location'];
    function NavController($location) {
        var vm = this;

        vm.currentUser = false;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
}());
