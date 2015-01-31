var mongoose = require('mongoose');

var PersonaDetailsClientSchema = new mongoose.Schema({
    address: String,
    mail: String,
    telephone: String,
    paymentMethod: String,
    deliveryMethod: String,
});

mongoose.model('PersonaDetailsClient', PersonaDetailsClientSchema);