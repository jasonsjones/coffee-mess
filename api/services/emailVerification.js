var jwt = require('jwt-simple');
var config = require('../../coffee-mess-creds.json');
var fs = require('fs');
var _ = require('underscore');
var nodemailer = require('nodemailer');

var model = {
    verifyUrl: 'https://coffee-mess-jsj0nes.c9users.io/auth/verifyEmail?token=',
    title: 'Coffee Mess',
    subTitle: 'Thanks for signing up',
    body: 'Please verify your email address by clicking the button below'
};

exports.send = function (email, res) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.emailSecret);

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'meansandbox@gmail.com',
            pass: config.gmailPass
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var mailOptions = {
        from: 'Accounts <meansandbox@gmail.com',
        to: email,
        subject: 'Coffee Mess Account Verification',
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('email sent... ', info.response);
        }

    });
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
