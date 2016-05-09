var request = require('request');
var googleAuth = require('../../coffee-mess-creds.json').google;
var createSendToken = require('../services/createSendToken');
var User = require('../models/user');

module.exports = function (req, res, next) {

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
                    if (err) {
                        console.log(err);
                    }

                    User.findOne({googleId: profile.sub}, function (err, foundUser) {
                       if (foundUser) {
                           return createSendToken(foundUser, res);
                       }

                       var newUser = new User();
                       newUser.googleId = profile.sub;
                       newUser.displayName = profile.name;
                       newUser.save(function (err) {
                           if (err) {
                               return next(err);
                           }
                           createSendToken(newUser, res);
                       });
                    });
                });
    });
};