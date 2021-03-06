// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');

// Connect to the coffeelocker MongoDB
mongoose.connect(config.db);

// Create the express application
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./config/passport')(app);

// Use environment defined port or 300
var port = process.env.PORT || config.port;

app.use(express.static('./node_modules'));
app.use(express.static('./public'));

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
