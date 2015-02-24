var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: String,
  timeDeposit: { type: Number, default: 1 },
  maxDailyProduction: { type: Number, default: 1 },
  colliSuRulli: {type: Number, default: 10}
});

mongoose.model('Product', ProductSchema);