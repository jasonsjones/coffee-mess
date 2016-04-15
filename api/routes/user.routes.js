var userCtrl = require('../controllers/user.controller');
var passport = require('passport');

module.exports = function (api) {

    // Create new route with prefix /register
    api.route('/register')
        .post(passport.authenticate('local-register'), userCtrl.passportPostUser);

    // Create new route with prefix /login
    api.route('/login')
        .post(passport.authenticate('local-login'), userCtrl.passportLoginUser);
};
