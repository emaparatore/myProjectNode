var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    personalDetailsClient: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonaDetailsClient' },
    companyName: String,
    dayNotice : {type: Number, default: 0},
    averageRevenue : {type: Number, default: 0},
    deliveryTime : {type: Number, default: 0}
});

mongoose.model('Client', ClientSchema);