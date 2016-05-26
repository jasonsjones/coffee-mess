var coffeeCtrl = require('../controllers/coffee.controller');

module.exports = function (api) {

    // Create new route with prefix /coffee
    api.route('/coffee')
        .get(coffeeCtrl.getCoffees)
        .post(coffeeCtrl.postCoffees);

    api.route('/coffee/:coffeeId')
        .get(coffeeCtrl.getCoffee)
        .put(coffeeCtrl.putCoffee)
        .delete(coffeeCtrl.deleteCoffee);
};
