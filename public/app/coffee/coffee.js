(function (){
    'use strict';

    angular.module('app')
        .factory('coffee', coffee);

    //=====================
    coffee.$inject = ['$q', '$http'];
    function coffee($q, $http) {

        var factory = {
            getCoffee: getCoffee,
            addCoffee: addCoffee,
            getOneCoffee: getOneCoffee,
            grindCoffee: grindCoffee
        };

        return factory;

        function getCoffee() {
            var deferred = $q.defer();
            $http.get('/api/coffee')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function addCoffee(newCoffee) {
            var deferred = $q.defer();
            $http.post('/api/coffee', newCoffee)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function getOneCoffee(coffeeId) {
            var deferred = $q.defer();
            $http.get('/api/coffee/'+ coffeeId)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function grindCoffee(id, amount) {
            console.info('Coffee Service: id -- ' + id);
            console.info('Coffee Service: grinding ' +amount+ ' oz of coffee');

        }
    }

}());
