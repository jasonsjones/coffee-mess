// Load require packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    var user = req.body;

    var newUser = new User({
        username: user.username,
        password: user.password
    });

    newUser.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json({
                success: true,
                message: 'New coffee drinker added to the coffee messs',
                user: newUser.toJSON()
            });
        }
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};
