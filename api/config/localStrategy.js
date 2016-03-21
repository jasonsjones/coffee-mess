var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function () {
    var strategy = new LocalStrategy(function (username, password, done) {
        User.findOne({username: username}).exec(function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Wrong email/password'
                });
            }

            user.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }

                if (!isMatch) {
                    return done(null, false, {
                        message: 'Wrong email/password'
                    });
                }

            });

            return done(null, user);
        });

    });

    passport.use(strategy);
};
