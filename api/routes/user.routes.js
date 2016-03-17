var userCtrl = require('../controllers/user.controller');

module.exports = function (api) {

    // Create new route with prefix /users
    api.route('/users')
        .post(userCtrl.postUsers);

    api.route('/register')
        .post(userCtrl.postUsers);

    api.route('/login')
        .post(userCtrl.loginUser);
};
