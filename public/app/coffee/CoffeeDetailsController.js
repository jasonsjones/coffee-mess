(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeDetailsController', CoffeeDetailsController);

    //=====================
    CoffeeDetailsController.$inject = ['$routeParams', 'coffee', 'alert'];
    function CoffeeDetailsController($routeParams, coffee, alert) {
        var vm = this;
        vm.coffee = null;
        var coffeeId = $routeParams.coffeeId;

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

    }
})();