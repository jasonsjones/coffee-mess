// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Connect to the coffeelocker MongoDB
mongoose.connect('mongodb://localhost:27017/coffeelocker');

// Create the express application
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the passport package in our app
app.use(passport.initialize());

// Use environment defined port or 300
var port = process.env.PORT || 3000;

app.use(express.static('./node_modules'));
app.use(express.static('./client'));

// Create express router
var router = express.Router();

// require routes from other files passing in the
// express router
require('./routes/coffee.routes')(router);
require('./routes/index.routes')(router);
require('./routes/user.routes')(router);

// Register all our routes with /api
app.use('/api', router);

app.get('*', function (req, res) {
    res.render('index', {title: 'Coffee Mess'});
});

// start the server
app.listen(port);
console.log('Insert coffee on port ' + port);
