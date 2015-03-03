var mongoose = require('mongoose');

var ApplicationPanelSchema = new mongoose.Schema({
    _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    dateStore: { type: Date }
});

module.exports = mongoose.model('ApplicationPanel', ApplicationPanelSchema);
 