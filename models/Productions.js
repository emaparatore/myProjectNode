var mongoose = require('mongoose');

var ProductionSchema = new mongoose.Schema({
    date: { type: Date },
    quantity: { type: Number, default: 0 },
    product: {
        _id : { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
        name: String,
        maxDailyProduction: { type: Number, default: 1 }
    }
});

mongoose.model('Production', ProductionSchema);