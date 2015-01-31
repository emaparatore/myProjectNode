﻿var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    date : {type:Date},
    client: {
        _clientId : {type : mongoose.Schema.Types.ObjectId, ref: 'Client'},
        companyName : String,
        dayNotice: { type: Number, default: 0 },
        averageRevenue: { type: Number, default: 0 },
        deliveryTime: { type: Number, default: 0 }
    },
    orderDetails: [
        {
            _productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            productName: String,
            timeDeposit: { type: Number, default: 1 },
            quantity: { type: Number }
        }
    ]
});

mongoose.model('Order', OrderSchema);