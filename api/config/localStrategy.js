var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function () {
    var loginStrategy = new LocalStrategy(function (username, password, done) {
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

    var registerStrategy = new LocalStrategy(function (username, password, done) {
        User.findOne({username: username}).exec(function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, {
                    message: 'username already exists'
                });
            }

           var newUser = new User({
               username: username,
               password: password
           });

           newUser.save(function (err) {
               if (err) {
                   done(err, null);
               }
               done(null, newUser);
           });

        });
    });

    passport.use('local-login', loginStrategy);
    passport.use('local-register', registerStrategy);
};
