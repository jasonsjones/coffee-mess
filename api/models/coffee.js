var mongoose = require('mongoose');

// Define the coffee schema
var CoffeeSchema = new mongoose.Schema({
    // userId: String,
    name: String,
    type: String,
    weightWholeBean: Number,
    weightGround: Number
});

// export the mongoose model
module.exports = mongoose.model('Coffee', CoffeeSchema);
