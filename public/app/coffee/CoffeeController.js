(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeController', CoffeeController);

    //=====================
    CoffeeController.$inject = ['coffee'];
    function CoffeeController(coffee) {
        var vm = this;
        vm.coffee = null;
        vm.getCoffee = getCoffee;

        init();

        function init() {
            if (!vm.coffee) {
                vm.getCoffee();
            }
        }

        function getCoffee() {
            coffee.getCoffee()
                .then(function (data) {
                    vm.coffee = data;
                });
        }

    }

}());
