var userCtrl = require('../controllers/user.controller');
var passport = require('passport');
var facebookAuth = require('../controllers/facebookAuth');
var googleAuth = require('../controllers/googleAuth');

module.exports = function (api) {

    // Create new route with prefix /register
    api.route('/register')
        .post(passport.authenticate('local-register'), userCtrl.passportPostUser);

    // Create new route with prefix /login
    api.route('/login')
        .post(passport.authenticate('local-login'), userCtrl.passportLoginUser);

    api.route('/auth/google')
        .post(googleAuth);

    api.route('/auth/facebook')
        .post(facebookAuth);
};
