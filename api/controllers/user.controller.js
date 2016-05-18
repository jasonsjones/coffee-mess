// Load require packages
var User = require('../models/user');
var passport = require('passport');
var createSendToken = require('../services/createSendToken');
var emailVerification = require('../services/emailVerification');

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

exports.passportPostUser = function (req, res) {
    emailVerification.send('jsjones96@gmail.com', res);
    createSendToken(req.user, res);
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

exports.loginUser = function (req, res, next) {
    passport.authenticate('local-login', function (err, user) {
        if (err) {
            next(err);
        }

        req.login(user, function (err) {
            if (err) {
                next(err);
            }
            createSendToken(user, res);
        });
    })(req, res, next);
};

exports.passportLoginUser = function (req, res) {
    createSendToken(req.user, res);
};
