(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeController', CoffeeController);

    //=====================
    CoffeeController.$inject = ['coffee', 'alert'];
    function CoffeeController(coffee, alert) {
        var vm = this;
        vm.coffees = null;
        vm.newCoffee = {};
        vm.getCoffee = getCoffee;
        vm.addCoffee = addCoffee;

        init();

        function init() {
            if (!vm.coffees) {
                vm.getCoffee();
            }
        }

        function addCoffee() {
            console.log('adding some coffee to the mess...');
            coffee.addCoffee(vm.newCoffee)
                .then(function (data) {
                    console.log(data);
                    vm.newCoffee = {};
                    alert('success', 'Coffee added to the mess...' + data.data.name);
                });
        }

        function getCoffee() {
            coffee.getCoffee()
                .then(function (data) {
                    vm.coffees = data;
                }, function (err) {
                    alert('warning', 'Unable to get coffee', err.message);
                });
        }
    }
}());
