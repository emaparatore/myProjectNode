var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    companyName : String,
    address : String,
    mail : String,
    telephone : String,
    dayNotice : {type: Number, default: 0},
    paymentMethod : String,
    deliveryMethod : String,
    averageRevenue : {type: Number, default: 0},
    deliveryTime : {type: Number, default: 0}
});

mongoose.model('Client', ClientSchema);