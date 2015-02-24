﻿var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    _idUser : { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    personalDetailsClient: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonaDetailsClient' },
    companyName: String,
    dayNotice : {type: Number, default: 0},
    averageRevenue : {type: Number, default: 0},
    deliveryTime : {type: Number, default: 0}
});

mongoose.model('Client', ClientSchema);