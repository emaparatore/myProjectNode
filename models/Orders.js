var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    date: { type: Date },
    lastDay : {type: Date},
    client: {
        _id : {type : mongoose.Schema.Types.ObjectId, ref: 'Client'},
        companyName : String,
        dayNotice: { type: Number, default: 0 },
        averageRevenue: { type: Number, default: 0 }
    },
    details: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            productName: String,
            timeDeposit: { type: Number, default: 1 },
            quantity: { type: Number }
        }
    ]
});

mongoose.model('Order', OrderSchema);