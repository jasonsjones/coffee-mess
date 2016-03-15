// Load require packages
var User = require('../models/user');
var jwt = require('jwt-simple');

// Create endpoint /api/users for POST
exports.postUsers = function (req, res) {
    var user = req.body;

    var newUser = new User({
        username: user.username,
        password: user.password
    });

    User.findOne({username: newUser.username}, function (err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            console.log('user already exists');
            return res.status(401).send({message: 'user already exists'});
        } else {
            newUser.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    createSendToken(newUser, res);
                }
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

exports.loginUser = function (req, res) {
    req.user = req.body;

    User.findOne({username: req.user.username}, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.status(401).send({message: 'Wrong email/password'});
        }

        user.verifyPassword(req.user.password, function (err, isMatch) {
            if (err) {
                throw err;
            }

            if (!isMatch) {
                return res.status(401).send({message: 'Wrong email/password'});
            }
            createSendToken(user, res);
        });

    });
};

function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'secretKey');

    res.status(200).json({
        success: true,
        user: user.toJSON(),
        token: token
    });
}
