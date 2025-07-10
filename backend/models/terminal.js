const mongoose = require('mongoose');

const TerminalSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  todaName: String
});

module.exports = mongoose.model('Terminal', TerminalSchema);