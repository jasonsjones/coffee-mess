var passport = require('passport');

module.exports = function (app) {
    
    // use the passport package in our app
    app.use(passport.initialize());

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    require('./localStrategy')();
};
