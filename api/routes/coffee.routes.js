var coffeeCtrl = require('../controllers/coffee.controller');

module.exports = function (api) {

    // Create new route with prefix /coffee
    api.route('/coffee')
        .post(coffeeCtrl.postCoffees)
        .get(coffeeCtrl.getCoffees);

    api.route('/coffee/:coffeeId')
        .get(coffeeCtrl.getCoffee)
        .put(coffeeCtrl.putCoffee)
        .delete(coffeeCtrl.deleteCoffee);
};
