var mongoose = require('mongoose');

var ProductionSchema = new mongoose.Schema({
    _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date },
    quantity: { type: Number, default: 0 },
    product: {
        _id : { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
        name: String,
        maxDailyProduction: { type: Number, default: 10 },
        colliSuRulli: { type: Number, default: 10 }
    }
});

mongoose.model('Production', ProductionSchema);