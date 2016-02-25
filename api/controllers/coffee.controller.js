// Load required pkgs
var Coffee = require('../models/coffee');

// Create endpoint /api/coffee for POSTS
exports.postCoffees = function (req, res) {
    // Create a new instance of the Coffee model
    var coffee = new Coffee();

    // Set the coffee properties that come from the POST data
    coffee.name = req.body.name;
    coffee.type = req.body.type;
    coffee.weight = req.body.weight;
    coffee.userId = req.user._id;

    // Save the coffee and check for errors
    coffee.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Coffee added to the locker!', data: coffee});
    });
};

// Create endpoint /api/coffee for GET
exports.getCoffees =  function (req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    }

    Coffee.find({userId: req.user._id}, function (err, coffee) {
        if (err) {
            res.send(err);
        }
        res.json(coffee);
    });
};

// Create endpoint /api/coffee/:coffee_id for GET
exports.getCoffee = function (req, res) {
    // Use the coffee model to find a specific coffee
    Coffee.findOne({userId: req.user._id, _id: req.params.coffeeId}, function (err, coffee) {
        if (err) {
            res.send(err);
        }
        res.json(coffee);
    });
};

// Create endpoint /api/coffee/:coffee_id for PUT
exports.putCoffee = function (req, res) {
    // Use the coffee model to find a specific coffee
    Coffee.findOne({userId: req.user._id, _id: req.params.coffeeId}, function (err, coffee) {
        if (err) {
            res.send(err);
        }

        // update the existing coffee weight
        coffee.weight = req.body.weight;

        // save the coffee and check for errors
        coffee.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(coffee);
        });
    });
};

// Create endpoint /api/coffee/:coffee_id for DELETE
exports.deleteCoffee = function (req, res) {
    // Use the coffee model to find a specific coffee and remove it
    Coffee.findByIdAndRemove(req.params.coffeeIid).exec(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Coffee removed from the locker!'});
    });
};
