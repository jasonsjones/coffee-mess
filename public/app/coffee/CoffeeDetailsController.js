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
            console.log($routeParams);
            getTheCoffe();
        }

        function getTheCoffe() {
            coffee.getOneCoffee(coffeeId)
                .then(function (data) {
                    vm.coffee = data;
                    console.log(vm.coffee);
                });
        }

        function grind() {
            console.log('grinding ' + vm.grindAmount + ' oz of coffee');
        }
    }
})();