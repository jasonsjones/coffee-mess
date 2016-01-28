var mongoose = require('mongoose');

// Define the coffee schema
var CoffeeSchema = new mongoose.Schema({
    name: String,
    type: String,
    weight: Number,
    userId: String
});

// export the mongoose model
module.exports = mongoose.model('Coffee', CoffeeSchema);
