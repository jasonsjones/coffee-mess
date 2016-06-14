(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeDetailsController', CoffeeDetailsController);

    //=====================
    CoffeeDetailsController.$inject = ['$routeParams', 'coffee', 'alert'];
    function CoffeeDetailsController($routeParams, coffee, alert) {
        var vm = this;
        vm.coffee = null;
        vm.grindAmount = 0;
        var coffeeId = $routeParams.coffeeId;

        vm.grind = grind;

        init();

        function init () {
            getTheCoffee();
        }

        function getTheCoffee() {
            coffee.getOneCoffee(coffeeId)
                .then(function (data) {
                    vm.coffee = data;
                });
        }

        function grind() {
            if (vm.grindAmount > 0) {
                coffee.grindCoffee(vm.coffee._id, vm.grindAmount)
                    .then(function (data) {
                        vm.coffee = data;
                        alert('success', 'Just ground '+ vm.grindAmount + ' oz of coffee');
                        vm.grindAmount = 0;
                    });
            }
        }
    }
})();