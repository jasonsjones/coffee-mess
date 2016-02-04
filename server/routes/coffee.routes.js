var coffeeCtrl = require('../controllers/coffee.controller');
var authCtrl = require('../controllers/auth.controller');

module.exports = function (api) {

    // Create new route with prefix /coffee
    api.route('/coffee')
        .post(authCtrl.isAuthenticated, coffeeCtrl.postCoffees)
        .get(authCtrl.isAuthenticated, coffeeCtrl.getCoffees);

    api.route('/coffee/:coffeeId')
        .get(authCtrl.isAuthenticated, coffeeCtrl.getCoffee)
        .put(authCtrl.isAuthenticated, coffeeCtrl.putCoffee)
        .delete(authCtrl.isAuthenticated, coffeeCtrl.deleteCoffee);
};
