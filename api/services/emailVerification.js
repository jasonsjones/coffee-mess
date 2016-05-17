var jwt = require('jwt-simple');
var config = require('../../coffee-mess-creds.json');
var fs = require('fs');
var _ = require('underscore');

var model = {
    verifyUrl: 'https://coffee-mess-jsj0nes.c9users.io/auth/verifyEmail?token=',
    title: 'Coffee Mess',
    subTitle: 'Thanks for signing up',
    body: 'Please verify your email address by clicking the button below'
};

exports.send = function (email) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.emailSecret);

    console.log(getHtml(token));
};

function getHtml(token) {
    var path = __dirname + '/../views/emailVerification.html';
    var html = fs.readFileSync(path, 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
}

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
