(function() {
    'use strict';
    angular.module('app')
        .controller('NavController', NavController);

    //=====================
    NavController.$inject = ['$location', 'authToken', 'alert', '$auth'];
    function NavController($location, authToken, alert, $auth) {
        var vm = this;

        vm.isAuthenticated = $auth.isAuthenticated;
        vm.logout = logout;
        vm.isActive = isActive;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function logout() {
            $auth.logout();
            alert('success', 'Logout Successful:', 'you have successfully logged out, have a great day!');
            $location.path('/');
        }
    }
}());
