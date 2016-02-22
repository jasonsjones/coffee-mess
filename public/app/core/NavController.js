(function() {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    //=====================
    NavController.$inject = ['$location', 'authToken'];
    function NavController($location, authToken) {
        var vm = this;

        vm.isAuthenticated = authToken.isAuthenticated;
        vm.logout = logout;
        vm.isActive = isActive;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function logout() {
            authToken.removeToken();
            $location.path('/');
        }
    }
}());
