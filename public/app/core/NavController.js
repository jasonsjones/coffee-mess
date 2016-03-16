(function() {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    //=====================
    NavController.$inject = ['$location', 'authToken', 'alert'];
    function NavController($location, authToken, alert) {
        var vm = this;

        vm.isAuthenticated = authToken.isAuthenticated;
        vm.logout = logout;
        vm.isActive = isActive;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function logout() {
            authToken.removeToken();
            alert('success', 'Logout Successful:', 'you have successfully logged out, have a great day!');
            $location.path('/');
        }
    }
}());
