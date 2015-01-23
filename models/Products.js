var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  timeDeposit: { type: Number, default: 1 },
  maxDailyProduction: { type: Number, default: 1 }
});

mongoose.model('Product', ProductSchema);