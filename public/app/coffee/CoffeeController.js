(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeController', CoffeeController);

    //=====================
    CoffeeController.$inject = ['coffee', 'alert'];
    function CoffeeController(coffee, alert) {
        var vm = this;
        vm.coffee = {};
        vm.newCoffee = {};
        vm.getCoffee = getCoffee;
        vm.addCoffee = addCoffee;

        init();

        function init() {
            if (!vm.coffee) {
                vm.getCoffee();
            }
        }

        function addCoffee() {
            console.log('adding some coffee to the mess...');
            console.log(vm.newCoffee);
            vm.newCoffee = {};
        }

        function getCoffee() {
            coffee.getCoffee()
                .then(function (data) {
                    vm.coffee = data;
                }, function (err) {
                    alert('warning', 'Unable to get coffee', err.message);
                });
        }

    }

}());
