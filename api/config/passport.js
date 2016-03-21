var passport = require('passport');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    require('./localStrategy')();
};
