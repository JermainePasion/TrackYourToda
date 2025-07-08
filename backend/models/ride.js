const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  from: {
    name: String,
    lat: Number,
    lng: Number
  },
  to: {
    name: String,
    lat: Number,
    lng: Number
  },
  distanceKm: Number,
  durationMinutes: Number,
  fare: Number,
  discountApplied: Boolean,
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // optional for now
  }
});

module.exports = mongoose.model('Ride', RideSchema);