const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider',
  },
  from: {
    lat: Number,
    lng: Number,
  },
  to: {
    lat: Number,
    lng: Number,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Ride', rideSchema);
