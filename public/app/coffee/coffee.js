(function (){
    'use strict';

    angular.module('app')
        .factory('coffee', coffee);

    //=====================
    coffee.$inject = ['$q', '$http'];
    function coffee($q, $http) {
        var coffee = ['Pike Place', 'Morning Joe', 'Espresso Roast'];

        var factory = {
            getCoffee: getCoffee
        };

        return factory;

        function getCoffee() {
            var deferred = $q.defer();
            deferred.resolve(coffee);
            return deferred.promise;
        }
    }

}());
