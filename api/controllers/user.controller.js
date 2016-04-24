// Load require packages
var User = require('../models/user');
var jwt = require('jwt-simple');
var passport = require('passport');
var request = require('request');
var googleAuth = require('../../coffee-mess-creds.json').web;

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

exports.googleAuth = function (req, res) {

    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        client_id: googleAuth.client_id,
        client_secret: googleAuth.client_secret,
        redirect_uri: googleAuth.redirect_uris[0],
        code: req.body.code,
        grant_type: 'authorization_code'
    };

    request.post(googleAuth.token_uri, {json: true, form: params},
        function (err, response, token) {
            if (err) {
               console.log(err);
            }

            var accessToken = token.access_token;
            var headers = {
                Authorization: 'Bearer ' + accessToken
            };

            request.get({url: apiUrl, headers: headers, json: true},
                function (err, response, profile) {
                    console.log(profile);
                });


    });
};

function createSendToken(user, res) {
    var payload = {
        sub: user.id
    };

    var token = jwt.encode(payload, 'secretKey');

    res.status(200).json({
        success: true,
        user: user.toJSON(),
        token: token
    });
}
