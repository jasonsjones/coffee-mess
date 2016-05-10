var request = require('request');
var qs = require('querystring');
var facebookCreds = require('../../coffee-mess-creds.json').facebook;
var createSendToken = require('../services/createSendToken');
var User = require('../models/user');

module.exports = function (req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/me';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: facebookCreds.client_secret,
        code: req.body.code
    };

    request.get({url: accessTokenUrl, qs: params}, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);

        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            User.findOne({facebookId: profile.id}, function (err, existingUser) {
                if (existingUser) {
                    return createSendToken(existingUser, res);
                }

                var newUser = new User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;
                newUser.save(function (err) {
                    createSendToken(newUser, res);
                });
            });
        });
    });
};