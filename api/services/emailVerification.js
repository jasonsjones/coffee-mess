var jwt = require('jwt-simple');
var config = require('../../coffee-mess-cred.json');

exports.send = function (email) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.emailSecret);

};