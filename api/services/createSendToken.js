var moment = require('moment');
var jwt = require('jwt-simple');

module.exports = function (user, res) {
    var payload = {
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };

    var token = jwt.encode(payload, 'secretKey');

    return res.status(200).json({
        success: true,
        user: user.toJSON(),
        token: token
    });
};