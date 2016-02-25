(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeController', CoffeeController);

    //=====================
    CoffeeController.$inject = ['coffee', 'alert'];
    function CoffeeController(coffee, alert) {
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
                }, function (err) {
                    alert('warning', 'Unable to get coffee', err.message);
                });
        }

    }

}());
