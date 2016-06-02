var mongoose = require('mongoose');

// Define the coffee schema
var CoffeeSchema = new mongoose.Schema({
    // userId: String,
    name: String,
    type: String,
    weightWholeBean: Number,
    weightGround: Number
});

CoffeeSchema.methods.grind = function (amount) {
    if (this.weightWholeBean > amount) {
        this.weightWholeBean -= amount;
        this.weightGround += amount;
    }
};

// export the mongoose model
module.exports = mongoose.model('Coffee', CoffeeSchema);
