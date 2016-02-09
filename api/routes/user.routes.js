var userCtrl = require('../controllers/user.controller');
// var authCtrl = require('../controllers/auth.controller');

module.exports = function (api) {

    // Create new route with prefix /users
    api.route('/users')
        .post(userCtrl.postUsers);
        // .get(authCtrl.isAuthenticated, userCtrl.getUsers);

    api.route('/register')
        .post(function (req, res) {
            console.log(req.body);
            res.json({
                success: true,
                message: 'New coffee drinker added to the coffee messs',
                name: req.body.username
            });
        });
};
