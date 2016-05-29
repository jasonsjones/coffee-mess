(function (){
    'use strict';

    angular.module('app')
        .controller('CoffeeDetailsController', CoffeeDetailsController);

    //=====================
    CoffeeDetailsController.$inject = ['coffee', 'alert'];
    function CoffeeDetailsController(coffee, alert) {

    }
})();