var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    date: { type: Date },
    lastDay : {type: Date},
    client: {
        _id : {type : mongoose.Schema.Types.ObjectId, ref: 'Client'},
        companyName : String,
        dayNotice: { type: Number, default: 0 },
        averageRevenue: { type: Number, default: 0 },
        deliveryTime: { type: Number, default: 0 }
    },
    details: [
        {
            product: {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                name: String,
                timeDeposit: { type: Number, default: 1 }
            },
            quantity: { type: Number }
        }
    ]
});

mongoose.model('Order', OrderSchema);