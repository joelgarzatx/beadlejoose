var mongoose = require('mongoose');

var BeadSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  desc: {type: String, required: true},
  qty: {type: Number, required: true}
});

module.exports = mongoose.model('Bead', BeadSchema);
