// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(strategyFn));

function strategyFn(username, password, callback) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return callback(err);
        }

        // No user found with that username
        if (!user) {
            return callback(null, false);
        }

        // Make sure the password is correct
        user.verifyPassword(password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }
            // password didn't match
            if (!isMatch) {
                return callback(null, false);
            }

            // success
            return callback(null, user);
        });
    });
}

exports.isAuthenticated = passport.authenticate('basic', { session: false });
