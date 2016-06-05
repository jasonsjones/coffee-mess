// Load required pkgs
var Coffee = require('../models/coffee');
var jwt = require('jwt-simple');

// Create endpoint /api/coffee for POSTS
exports.postCoffees = function (req, res) {

    // Set the coffee properties that come from the POST data
    var coffee = {
        //userId = req.user._id;
        name : req.body.name,
        type : req.body.type,
        weightWholeBean : req.body.weightWholeBean,
        weightGround : req.body.weightGround,

    };

    // Create a new instance of the Coffee model
    var newCoffee = new Coffee(coffee);

    // Save the coffee and check for errors
    newCoffee.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Coffee added to the locker!', data: newCoffee});
    });
};

// Create endpoint /api/coffee for GET
exports.getCoffees =  function (req, res) {

    //verifyAuthorization(req, res);

    Coffee.find({/*userId: req.user._id,*/}, function (err, coffees) {
        if (err) {
            res.send(err);
        }
        console.log(coffees);
        res.json(coffees);
    });
};

// Create endpoint /api/coffee/:coffee_id for GET
exports.getCoffee = function (req, res) {
    // Use the coffee model to find a specific coffee
    Coffee.findOne({/*userId: req.user._id,*/ _id: req.params.coffeeId}, function (err, coffee) {
        if (err) {
            res.send(err);
        }
        console.log(coffee);
        res.json(coffee);
    });
};

// Create endpoint /api/coffee/:coffee_id for PUT
exports.putCoffee = function (req, res) {
    // Use the coffee model to find a specific coffee
    Coffee.findOne({/*userId: req.user._id,*/ _id: req.params.coffeeId}, function (err, coffee) {
        if (err) {
            res.send(err);
        }

        // update the existing coffee weight
        coffee.weightGround = req.body.weightGround;
        coffee.weightWholeBean = req.body.weightWholeBean;

        // save the coffee and check for errors
        coffee.save(function (err) {
            if (err) {
                res.send(err);
            }
            console.log(coffee);
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
        res.json({message: 'Coffee removed from the mess!'});
    });
};

exports.grindCoffee = function (req, res) {
    Coffee.findOne({/*userId: req.user._id,*/ _id: req.params.coffeeId}, function (err, coffee) {
        if (err) {
            res.send(err);
        }

        if (coffee) {
            console.info("we are going to grind some of this coffee" + coffee);
        }
    });
};

function verifyAuthorization(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'You are not authorized'});
    } else {
        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, 'secretKey');

        if (!payload.sub) {
            return res.status(401).send({message: 'Authentication failied'});
        }
        console.log(payload);

    }
}